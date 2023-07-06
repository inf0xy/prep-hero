import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { ObjectId } from 'mongodb';
import { deleteUserNote } from '@/lib/database/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, userId } = req.query;

  if (req.method === 'DELETE' && title && userId) {
    try {
      const result = await deleteUserNote(
        new ObjectId(userId as string),
        title as string
      );
      if (result.hasOwnProperty('notes')) {
        res.status(200).json({ notes: result.notes });
      } else {
        res.status(500).json(result);
      }
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};

export default checkAuth(handler);
