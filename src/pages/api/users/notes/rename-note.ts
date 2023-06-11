import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { editNoteName } from '@/lib/database/users';
import { ObjectId } from 'mongodb';
import { Note } from '@/types/dataTypes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { noteNames, userId } = req.body;

  if (req.method === 'PUT' && noteNames) {
    const { oldTitle, newTitle } = noteNames;
    try {
      const result = await editNoteName(
        new ObjectId(userId),
        oldTitle,
        newTitle
      );

      res
        .status(201)
        .json({ notes: (result[0] as unknown as { notes: Note[] }).notes });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
};

export default checkAuth(handler);
