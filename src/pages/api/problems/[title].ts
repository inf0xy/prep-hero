import { getProblemByTitle } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;

  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid' });
  }

  if (title === undefined) {
    return res.status(400).json({ message: 'Invalid input.' });
  }

  try {
    const result = await getProblemByTitle(title as string);
  res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default handler;
