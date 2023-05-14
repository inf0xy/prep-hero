import { getProblemTitles } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid' });
  }

  try {
    const result = await getProblemTitles();
    res.status(200).json(result.map(el => el.title));
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default handler;
