import { NextApiRequest, NextApiResponse } from 'next';
import { validateFormData } from '@/helpers/validateFormData';
import { createUser } from '@/lib/database/users';

type BodyData = {
  name: string;
  email: string;
  password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as BodyData | undefined;

  if (data?.name && data?.email && data?.password) {
    const { name, email, password } = data;
    const { validEmail, validPassword } = validateFormData(email, password, '');
    if (!validEmail || !validPassword) {
      return res.status(422).json({ message: 'Invalid input' });
    }

    try {
      const result = await createUser(
        name,
        email,
        password,
        null,
        null,
        null,
        null
      );
      res.status(201).json({ message: 'Successfully create new user.' });
    } catch (err: any) {
      if (!err.message.includes('duplicate key error')) {
        console.error(err);
      }

      if (err.message.includes('duplicate key error')) {
        res.status(422).json({ message: 'Email existed.' });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  } else {
    res.status(422).json({
      message: 'Invalid input - Name, email and password are required!'
    });
  }
};

export default handler;
