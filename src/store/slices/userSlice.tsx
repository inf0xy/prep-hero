import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import {
  Note,
  AttemptedProblem,
  EasySolved,
  MediumSolved,
  HardSolved,
  Submission
} from '@/types/dataTypes';

interface User {
  notes: Note[];
  attempted_problems: AttemptedProblem[];
  submissions: Submission[];
  easy_solved: EasySolved[];
  medium_solved: MediumSolved[];
  hard_solved: HardSolved[];
  total_solved: Number;
  isLoading?: boolean;
  error?: string | undefined;
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const newSession = await getSession();
    const id = newSession?.session.user._id;

    const { data } = await axios.get<User>(`/api/users/${id}`);
    return data;
  }
);

const initialState: User = {
  notes: [],
  attempted_problems: [],
  submissions: [],
  easy_solved: [],
  medium_solved: [],
  hard_solved: [],
  total_solved: 0,
  isLoading: false,
  error: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
  console.log('action payload, ', action.payload);
      if (action.payload) {
        state.isLoading = false;
        state.notes = action.payload.notes;
        state.attempted_problems = action.payload.attempted_problems;
        state.submissions = action.payload.submissions;
        state.easy_solved = action.payload.easy_solved;
        state.medium_solved = action.payload.medium_solved;
        state.hard_solved = action.payload.hard_solved;
        state.total_solved = action.payload.total_solved;
      }
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
