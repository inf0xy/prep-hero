import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const checkAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession();
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized from checkAuth' });
    }

    return handler(req, res);
  };
