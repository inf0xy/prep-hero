import { getProblems } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  if (page) {
    try {
      const result = await getProblems(+page);
      res.status(200).json(result);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
};

export default handler;
