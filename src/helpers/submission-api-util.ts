import { getSession } from "next-auth/react";
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const runCode = async (submission: string) => {
  const session = await getSession();
  if (!session) {
    return 'Please log in';
  }

  const userId = session.session.user._id;

  try {
    const result = await axios.post(`${BACKEND_URL}/run/python`, { userId, code: submission });
    return result.data;
  } catch (err: any) {
    return { error: err.message }
  }
};

export const submitCode = async (submission: string, language: string, title: string, mode: string) => {
  const session = await getSession();

  if (!session) {
    return { error: 'Please log in' };
  }

  const userId = session.session.user._id;

  try {
     const result = await axios.post(`${BACKEND_URL}/submit/${language}`, {
      userId,
      code: submission,
      title,
      mode
    });

    return result.data;
  } catch (err: any) {
    console.error(err);
    return { error: err.message }
  }
}