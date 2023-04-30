import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Note, Problem } from '@/types/dataTypes';

interface ProblemState {
  selectedProblem: {
    list_name: string | undefined;
    title: string | undefined;
    difficulty: "Easy" | "Medium" | "Hard" | undefined;
    category: string | undefined;
    companies: string[] | undefined;
    tags: string[] | undefined;
    leetcode_link: string | undefined;
    solution_link: string | undefined;
    description: string | undefined;
  };
  isLoading: boolean;
  error: undefined | string;
}

// export const addOrUpdateNote = createAsyncThunk(
//   'notes/addOrUpdateNote',
//   async (note: Note) => {
//     const session = await getSession();
//     if (!session) {
//       throw new Error('Required login');
//     }
//     const userId = session?.session.user._id;
//     const { data } = await axios.post('/api/users/notes/add', { note, userId });
//     return data;
//   }
// );

// export const deleteNote = createAsyncThunk(
//   'notes/deleteNote',
//   async (title: string, { rejectWithValue }) => {
//     const session = await getSession();
//     if (!session) {
//       return rejectWithValue(new Error('Required login'));
//     }
//     const userId = session?.session.user._id;
//     const { data } = await axios.delete('/api/users/notes/delete', {
//       params: { title, userId }
//     });
//     return data;
//   }
// );

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
  isLoading: false,
  error: undefined
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setSelectedProblem(state, action) {
      state.selectedProblem.list_name = action.payload.ist_name;
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
  // extraReducers: (builder) => {
  //   builder.addCase(addOrUpdateNote.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(addOrUpdateNote.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.error = undefined;
  //   });
  //   builder.addCase(addOrUpdateNote.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.error.message;
  //   });
  //   builder.addCase(deleteNote.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(deleteNote.fulfilled, (state) => {
  //     state.isLoading = false;
  //     state.error = undefined;
  //   });
  //   builder.addCase(deleteNote.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.error.message;
  //   });
  // }
});

export const { setSelectedProblem } = problemsSlice.actions;
export default problemsSlice.reducer;
