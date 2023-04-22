import axios from 'axios';
import { Problem } from '@/types/dataTypes';

export const getAllProblems = async (page: number) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/problems', { params: { page } });
    return data;
  } catch (err: any) {
    console.error(err.message);
  }
};
