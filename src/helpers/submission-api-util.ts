import { getSession } from "next-auth/react";
import axios from 'axios';

export const runCode = async (submission: string) => {
  const session = await getSession();

  if (!session) {
    return 'Please log in';
  }

  try {
    const result = await axios.post('http://localhost:5000/run/python', { code: submission });
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

  try {
    const result = await axios.post(`http://localhost:5000/submit/${language}`, {
      code: submission,
      title,
      mode
    });
    return result.data;
  } catch (err: any) {
    return { error: err.message }
  }
}