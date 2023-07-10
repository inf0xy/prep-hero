import { getProblemTitles } from '@/lib/database/problems';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid' });
  }

  try {
    const { titles, testTitles } = await getProblemTitles();
    const titleList = titles.map(el => el.title);
    const testTitleList = testTitles.map(el => el.title);
    res.status(200).json({ titles: titleList, testTitles: testTitleList });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default handler;