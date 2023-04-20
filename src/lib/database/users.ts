import { ObjectId } from 'mongodb';
import { connectDB, usersCollection } from './db-util';
import { hashPassword, comparePassword } from '@/lib/auth';

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
    public easy_solved: number = 0,
    public medium_solved: number = 0,
    public hard_solved: number = 0,
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
