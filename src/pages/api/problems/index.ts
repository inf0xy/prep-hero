import { getProblems } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, category, difficulty, tags, companies, text } = req.query;
  if (
    page === undefined ||
    category === undefined ||
    difficulty === undefined ||
    tags === undefined ||
    companies === undefined ||
    text === undefined
  ) {
    return res.status(400).json({ message: 'Invalid input.' })
  }

  try {
    const result = await getProblems(
      +page!,
      category as string,
      difficulty as string,
      tags as string,
      companies as string,
      text as string
    );
    res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default handler;
