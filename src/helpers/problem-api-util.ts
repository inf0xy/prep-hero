import axios from 'axios';
import { SearchCriteria } from '@/types/dataTypes';

export const getProblems = async (page: number, filters: SearchCriteria) => {
  const paramsConfig = {
    page,
    category: filters.category,
    difficulty: filters.difficulty,
    tags: JSON.stringify(filters.tags),
    companies: JSON.stringify(filters.companies),
    text: filters.text
  }

  try {
    const { data } = await axios.get('http://localhost:3000/api/problems', {
      params: paramsConfig
    });
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
};