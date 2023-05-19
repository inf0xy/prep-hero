import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../checkAuth';
import { saveSubmission } from '@/lib/database/users';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { submission, userId } = req.body;

  if (req.method === 'POST') {
    try {
      const result = await saveSubmission(new ObjectId(userId), submission);
      res.status(201).json({ message: result, submission });
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};

export default checkAuth(handler);
