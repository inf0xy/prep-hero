import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { ObjectId } from 'mongodb';
import { deleteFolder } from '@/lib/database/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { folderName, userId } = req.query;

  if (req.method === 'DELETE' && folderName && userId) {
    try {
      const result = await deleteFolder(
        new ObjectId(userId as string),
        folderName as string
      );
      res.status(200).json({ notes: result[0].notes });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
};

export default checkAuth(handler);
