import { ObjectId } from 'mongodb';
import { connectDB, usersCollection } from './db-util';
import { hashPassword, comparePassword } from '@/lib/auth';
import { Note } from '@/types/dataTypes';

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
              list_name,
              title,
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
  if (result.modifiedCount === 1) {
    return { message: 'Deleted', title };
  } else {
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
