import { getSession } from 'next-auth/react';
import axios from 'axios';
import Test from '@/lib/database/tests';

type AddTestAxiosResposn = {
  message: string;
};

export const addTest = async (test: Test) => {
  const session = await getSession();
  if (!session || session!.session.user.account_type !== 'admin') {
    return { error: 'Unauthorized' };
  }

  try {
    const result = await axios.post<AddTestAxiosResposn>(
      '/api/problems/tests',
      { test }
    );
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
};
