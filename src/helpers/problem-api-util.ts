import axios from 'axios';
import { SearchCriteria } from '@/types/dataTypes';

export const getProblems = async (page: number, filters: SearchCriteria) => {
  const paramsConfig = {
    page,
    listName: filters.listName,
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

export const getAllTitles = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/problems/titles');
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

export const getSelectedProblem = async (title: string) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/problems/${title}`);
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

