import { MongoClient, Collection, Db } from 'mongodb';

const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_DBURL = `${process.env.MONGO_DBURL}/${MONGO_DBNAME}`;

const client = new MongoClient(MONGO_DBURL);

export let db: Db;

export let usersCollection: Collection;
export let problemsCollection: Collection;

export const connectDB = async () => {
  await client.connect();
  db = client.db(MONGO_DBNAME);
  usersCollection = db.collection('users');
  problemsCollection = db.collection('problems');
};

export const disconnectDB = async () => {
  client.close();
};

export default client;
