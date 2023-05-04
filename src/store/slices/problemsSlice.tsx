import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Problem } from '@/types/dataTypes';

interface ProblemState {
  selectedProblem: {
    list_name: string | undefined;
    title: string | undefined;
    difficulty: 'Easy' | 'Medium' | 'Hard' | undefined;
    category: string | undefined;
    companies: string[] | undefined;
    tags: string[] | undefined;
    leetcode_link: string | undefined;
    solution_link: string | undefined;
    description: string | undefined;
  };
  allProblemsCount: number;
  easyProblemsCount: number;
  mediumProblemsCount: number;
  hardProblemsCount: number;
  isLoading: boolean;
  error: undefined | string;
}

export const addProblem = createAsyncThunk(
  'problems/addProblem',
  async (problem: Problem) => {
    const session = await getSession();
    if (!session && session!.session.user.account_type !== 'admin') {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.post('/api/problems/new', problem);
    return data;
  }
);

export const updateProblem = createAsyncThunk(
  'problems/updateProblem',
  async (problem: Problem) => {
    const session = await getSession();
    if (!session && session!.session.user.account_type !== 'admin') {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.put('/api/problems/new', problem);
    return data;
  }
);

export const getProblemCounts = createAsyncThunk(
  'problems/getProblemCounts',
  async () => {
    const { data } = await axios.get('/api/problems/count');
    return data;
  }
);

const initialState: ProblemState = {
  selectedProblem: {
    list_name: undefined,
    title: undefined,
    difficulty: undefined,
    category: undefined,
    companies: undefined,
    tags: undefined,
    leetcode_link: undefined,
    solution_link: undefined,
    description: undefined
  },
  allProblemsCount: 0,
  easyProblemsCount: 0,
  mediumProblemsCount: 0,
  hardProblemsCount: 0,
  isLoading: false,
  error: undefined
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setSelectedProblem(state, action) {
      state.selectedProblem.list_name = action.payload.list_name;
      state.selectedProblem.title = action.payload.title;
      state.selectedProblem.difficulty = action.payload.difficulty;
      state.selectedProblem.category = action.payload.category;
      state.selectedProblem.companies = action.payload.companies;
      state.selectedProblem.tags = action.payload.tags;
      state.selectedProblem.leetcode_link = action.payload.leetcode_link;
      state.selectedProblem.solution_link = action.payload.solution_link;
      state.selectedProblem.description = action.payload.description;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addProblem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(addProblem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateProblem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(updateProblem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getProblemCounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProblemCounts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      const [{ easyCount }, { mediumCount }, { hardCount }] = action.payload;
      state.easyProblemsCount = easyCount;
      state.mediumProblemsCount = mediumCount;
      state.hardProblemsCount = hardCount;
      state.allProblemsCount = easyCount + mediumCount + hardCount;
    });
    builder.addCase(getProblemCounts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setSelectedProblem } = problemsSlice.actions;
export default problemsSlice.reducer;
