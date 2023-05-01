import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export const checkAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (
      !session ||
      (session.session.user.account_type !== 'admin' &&
        req.url === 'url /api/problems/new')
    ) {
      return res.status(401).json({ error: 'Unauthorized from checkAuth' });
    }

    return handler(req, res);
  };
