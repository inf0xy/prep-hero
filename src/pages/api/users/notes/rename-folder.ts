import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../../checkAuth';
import { editListName } from '@/lib/database/users';
import { ObjectId } from 'mongodb';
import { Note } from '@/types/dataTypes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { folderNames, userId } = req.body;

  if (req.method === 'PUT' && folderNames) {
    const { oldFolderName, newFolderName } = folderNames;
    try {
      const result = await editListName(
        new ObjectId(userId),
        oldFolderName,
        newFolderName
      );

      if (result === 'Not allowed') {
        res.status(405).json({ message: 'Folder is not allowed.' });
      }
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
