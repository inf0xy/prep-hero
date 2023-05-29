import { ObjectId } from 'mongodb';
import { connectDB, usersCollection } from './db-util';
import { getProblemByTitle } from './problems';
import { hashPassword, comparePassword } from '@/lib/auth';
import { Note, Submission } from '@/types/dataTypes';

type List = {
  problem_id: ObjectId;
  last_attempt: Date | null;
  solved: boolean;
  note: string | null;
  record: number | null;
};

export default class User {
  constructor(
    public name: string,
    public email: string | null = null,
    public password: string | null = null,
    public oauth_type: string | null = null,
    public google_id: string | null = null,
    public github_id: string | null = null,
    public facebook_id: string | null = null,
    public account_type: 'user' | 'admin' = 'user',
    public list: List[] = [],
    public notes: List[] = [],
    public attempted_problems: List[] = [],
    public submissions: List[] = [],
    public easy_solved: List[] = [],
    public medium_solved: List[] = [],
    public hard_solved: List[] = [],
    public total_solved: number = 0
  ) {
    this.account_type = account_type;
    this.oauth_type = oauth_type;
    this.google_id = google_id;
    this.github_id = github_id;
    this.facebook_id = facebook_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.list = list;
    this.notes = notes;
    this.notes = notes;
    this.attempted_problems = attempted_problems;
    this.submissions = submissions;
    this.easy_solved = easy_solved;
    this.medium_solved = medium_solved;
    this.hard_solved = hard_solved;
    this.total_solved = total_solved;
  }
}

export const createUser = async (
  name: string,
  email: string | null,
  password: string | null,
  oauth_type: string | null,
  google_id: string | null = null,
  github_id: string | null = null,
  facebook_id: string | null = null
) => {
  let hashed = null;
  if (!oauth_type && password) {
    hashed = await hashPassword(password);
  }
  const newUser = new User(
    name,
    email,
    hashed,
    oauth_type,
    google_id,
    github_id,
    facebook_id
  );
  await connectDB();
  return usersCollection.insertOne(newUser);
};

export const confirmAndFetchUser = async (email: string, password: string) => {
  await connectDB();
  const user = await usersCollection.findOne({ email });
  if (user) {
    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      return { email: user.email, isConfirmed: true };
    }
  }
  return { email: undefined, id: undefined, isConfirmed: false };
};

export const fetchUser = async (oauth_type: string, email: string) => {
  await connectDB();
  return usersCollection.findOne(
    { email, oauth_type },
    { projection: { _id: 1, name: 1, email: 1, account_type: 1 } }
  );
};

export const getUserData = async (_id: ObjectId) => {
  await connectDB();
  return usersCollection.findOne(
    { _id },
    {
      projection: {
        list: 1,
        notes: 1,
        attempted_problems: 1,
        submissions: 1,
        easy_solved: 1,
        medium_solved: 1,
        hard_solved: 1,
        total_solved: 1
      }
    }
  );
};

export const createOrUpdateNote = async (userId: ObjectId, note: Note) => {
  await connectDB();
  const { listName: list_name, title, content } = note;

  if (list_name && title && content) {
    const result = await usersCollection
      .find({ _id: userId, 'notes.title': title })
      .toArray();
    if (result && result[0]) {
      const data = await usersCollection.updateOne(
        { _id: userId, 'notes.title': title },
        {
          $set: {
            'notes.$.list_name': list_name,
            'notes.$.title': title,
            'notes.$.content': content
          }
        }
      );
      return 'Udpated';
    } else {
      const data = await usersCollection.updateOne(
        { _id: userId },
        {
          $push: {
            notes: {
              list_name: list_name,
              title: title,
              content: content
            }
          }
        }
      );
      return 'Created';
    }
  } else {
    return null;
  }
};

export const deleteUserNote = async (userId: ObjectId, title: string) => {
  await connectDB();
  const result = await usersCollection.updateOne(
    { _id: userId },
    { $pull: { notes: { title } } }
  );
console.log('Deleted RESULT with title ', title, 'and result is ', result);
  if (result.modifiedCount === 1) {
console.log('Deleted')
    return { message: 'Deleted', title };
  } else {
console.log('Unable to delete note.')
    return { message: 'Unable to delete note.' };
  }
};

export const addProblemToList = async (_id: ObjectId, title: string) => {
  await connectDB();
  return usersCollection.updateOne({ _id }, { $push: { list: title } });
};

export const removeProbleFromlist = async (_id: ObjectId, title: string) => {
  await connectDB();
  return usersCollection.updateOne({ _id }, { $pull: { list: title } });
};

export const clearList = async (_id: ObjectId) => {
  await connectDB();
  return usersCollection.updateOne({ _id }, { $set: { list: [] } });
};

export const saveSubmission = async (_id: ObjectId, submission: Submission) => {
  await connectDB();

  const user = await usersCollection.findOne({ _id });
  const problem = await getProblemByTitle(submission.title);

  let easy_solved = user!['easy_solved'];
  let medium_solved = user!['medium_solved'];
  let hard_solved = user!['hard_solved'];

  if (submission.accepted) {
    easy_solved = user!['easy_solved'].filter(
      (el: { title: string; date: Date }) => el.title !== submission.title
    );

    medium_solved = user!['medium_solved'].filter(
      (el: { title: string; date: Date }) => el.title !== submission.title
    );

    hard_solved = user!['hard_solved'].filter(
      (el: { title: string; date: Date }) => el.title !== submission.title
    );

    if (problem!.difficulty === 'Easy') {
      easy_solved.push({
        title: submission.title,
        date: new Date(submission.date)
      });
    } else if (problem!.difficulty === 'Medium') {
      medium_solved.push({
        title: submission.title,
        date: new Date(submission.date)
      });
    } else {
      hard_solved.push({
        title: submission.title,
        date: new Date(submission.date)
      });
    }
  }

  const total_solved =
    easy_solved.length + medium_solved.length + hard_solved.length;

  return usersCollection.updateOne(
    { _id },
    {
      $set: { easy_solved, medium_solved, hard_solved, total_solved },
      $push: {
        submissions: {
          title: submission.title,
          language: submission.language,
          code: submission.code,
          accepted: submission.accepted,
          date: new Date()
        }
      }
    }
  );
};
