import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { ObjectId } from 'mongodb';
import {
  addProblemToList,
  clearList,
  removeProbleFromlist
} from '@/lib/database/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, userId } = req.body;
    try {
      await addProblemToList(new ObjectId(userId), title);
      res.status(201).json({ message: 'Added', title });
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid request' });
    }
  } else if (req.method === 'DELETE') {
    const { title, userId } = req.query;
    try {
      await removeProbleFromlist(
        new ObjectId(userId as string),
        title as string
      );
      res.status(200).json({ message: 'Removed', title });
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid request' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { userId } = req.body;
      await clearList(new ObjectId(userId as string));
      return res.status(200).json({ message: 'Cleared' });
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};

export default checkAuth(handler);
