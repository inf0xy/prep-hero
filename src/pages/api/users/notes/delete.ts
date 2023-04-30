import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '@/middlewares/checkAuth';
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
      res.status(result.title ? 200 : 500).json(result);
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }
};

// export default checkAuth(handler);
export default handler;
