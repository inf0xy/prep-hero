import { addNewTest, getTests } from '@/lib/database/tests';
import { NextApiRequest, NextApiResponse } from 'next';

import Test from '@/lib/database/tests';
import { checkAuth } from '../checkAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid' });
  }

  if (req.method === 'POST') {
    const { test } = req.body;

    if (test === undefined) {
      return res.status(400).json({ message: 'Invalid input.' });
    }

    try {
      const result = await addNewTest(test as Test);
      res.status(200).json({ message: 'Successfully adding new test'});
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
};

export default checkAuth(handler);
