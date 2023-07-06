import { NextApiRequest, NextApiResponse } from 'next';
import { checkAuth } from '../checkAuth';
import { setTimerReminder } from '@/lib/database/users';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { timer_reminder, userId } = req.body;

  if (req.method === 'PUT') {
    try {
      await setTimerReminder(new ObjectId(userId), timer_reminder);
      res.status(200).json({ message: 'Timer is set', timer_reminder });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
};

export default checkAuth(handler);