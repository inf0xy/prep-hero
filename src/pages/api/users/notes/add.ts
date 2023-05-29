import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { createOrUpdateNote } from '@/lib/database/users';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { note, userId } = req.body;

  if (req.method === 'POST') {
    try {
      const result = await createOrUpdateNote(new ObjectId(userId), note);
      res.status(201).json({ message: result, note });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};

export default checkAuth(handler);
