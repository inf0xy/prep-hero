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
import {
  addOrUpdateNote,
  deleteNote,
  renameFolder,
  deleteFolder,
  renameNote
} from './notesSlice';
import { useAppDispatch } from '@/hooks/hooks';

interface User {
  notes: Note[];
  list: string[];
  attempted_problems: AttemptedProblem[];
  submissions: Submission[];
  easy_solved: EasySolved[];
  medium_solved: MediumSolved[];
  hard_solved: HardSolved[];
  total_solved: Number;
  timer_reminder: boolean;
  isLoading?: boolean;
  error?: string | undefined;
  duration?: number;
  timerDuration?: number;
}

interface AddProblemToListResponse {
  title: string;
  message: string;
}

interface RemoveProblemToListResponse {
  title: string;
  message: string;
}

interface SaveSubmittedCodeResponse {
  submission: Submission;
  message: string;
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const session = await getSession();
    const id = session?.session.user._id;
    if (!session) {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.get<User>(`/api/users/${id}`);
    return data;
  }
);

export const addProblemToList = createAsyncThunk(
  'user/addProblemToList',
  async (title: string) => {
    const session = await getSession();
    const userId = session?.session.user._id;
    if (!session) {
      throw new Error('Unauthorized');
    }

    const { data } = await axios.post<AddProblemToListResponse>(
      '/api/users/list',
      {
        userId,
        title
      }
    );
    return data;
  }
);

export const resetList = createAsyncThunk('user/resetList', async () => {
  const session = await getSession();
  const userId = session?.session.user._id;
  if (!session) {
    throw new Error('Unauthorized');
  }
  const { data } = await axios.put<{ message: string }>('/api/users/list', {
    userId
  });
  return data;
});

export const removeProblemFromList = createAsyncThunk(
  'user/removeProblemToList',
  async (title: string) => {
    const session = await getSession();
    const userId = session?.session.user._id;
    if (!session) {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.delete<RemoveProblemToListResponse>(
      '/api/users/list',
      {
        params: { title, userId }
      }
    );
    return data;
  }
);

export const saveSubmittedCode = createAsyncThunk(
  'user/saveSubmittedCode',
  async (submission: Submission) => {
    const session = await getSession();
    const userId = session?.session.user._id;
    if (!session) {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.post<SaveSubmittedCodeResponse>(
      '/api/users/submissions',
      { submission, userId }
    );
    return data;
  }
);

export const setTimerReminder = createAsyncThunk(
  'user/setTimerReminder',
  async (timerReminder: boolean) => {
    const session = await getSession();
    const userId = session?.session.user._id;
    if (!session) {
      throw new Error('Unauthorized');
    }
    const { data } = await axios.put<{
      message: string;
      timer_reminder: boolean;
    }>('/api/users/timer', { timer_reminder: timerReminder, userId });
    return data;
  }
);

const initialState: User = {
  notes: [],
  list: [],
  attempted_problems: [],
  submissions: [],
  easy_solved: [],
  medium_solved: [],
  hard_solved: [],
  total_solved: 0,
  timer_reminder: false,
  isLoading: false,
  error: undefined,
  duration: 0,
  timerDuration: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setTimerDuration(state, action) {
      state.timerDuration = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.isLoading = false;
        state.notes = action.payload.notes;
        state.list = action.payload.list;
        state.timer_reminder = action.payload.timer_reminder;
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
    builder.addCase(addOrUpdateNote.fulfilled, (state, action) => {
      const { note } = action.payload;
      const noteIndex = state.notes.findIndex(
        (el) => el.title === note.title && el.list_name === note.list_name
      );

      if (noteIndex !== -1) {
        state.notes.splice(noteIndex, 1, note);
      } else {
        state.notes.push(note);
      }
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      const { notes } = action.payload;
      if (notes) {
        state.notes = notes;
      }
    });
    builder.addCase(addProblemToList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProblemToList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.list.push(action.payload.title);
    });
    builder.addCase(addProblemToList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(setTimerReminder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setTimerReminder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.timer_reminder = action.payload.timer_reminder;
    });
    builder.addCase(setTimerReminder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(removeProblemFromList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeProblemFromList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      const removedIndex = state.list.findIndex(
        (el) => el === action.payload.title
      );
      state.list.splice(removedIndex, 1);
    });
    builder.addCase(removeProblemFromList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(resetList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetList.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
      state.list = [];
    });
    builder.addCase(resetList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(saveSubmittedCode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveSubmittedCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;

      const { submission } = action.payload;
      state.submissions.push(submission);

      if (!submission.accepted) {
        state.attempted_problems.push(submission);
      } else {
        state.attempted_problems = state.attempted_problems.filter(
          (el) => el.title !== submission.title
        );
      }
    });
    builder.addCase(saveSubmittedCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(renameFolder.fulfilled, (state, action) => {
      const { notes } = action.payload;
      if (notes) {
        state.notes = notes;
      }
    });
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      const { notes } = action.payload;
      if (notes) {
        state.notes = notes;
      }
    });
    builder.addCase(renameNote.fulfilled, (state, action) => {
      const { notes } = action.payload;
      if (notes) {
        state.notes = notes;
      }
    });
  }
});

export const { setDuration, setTimerDuration } = userSlice.actions;
export default userSlice.reducer;
