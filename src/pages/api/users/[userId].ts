import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '@/pages/api/checkAuth';
import { getUserData } from '@/lib/database/users';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId as string;
  if (req.method === 'GET') {
    try {
      const data = await getUserData(new ObjectId(userId));
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json('Not found');
      }
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ message: 'Invalid input' });
    }
  }
};

export default checkAuth(handler);
