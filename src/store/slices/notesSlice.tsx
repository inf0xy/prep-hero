import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Note } from '@/types/dataTypes';

interface NotesState {
  selectedNote: {
    listName: string | undefined;
    title: string | undefined;
  };
  isLoading: boolean;
  error: undefined | string;
}

export const addOrUpdateNote = createAsyncThunk(
  'notes/addOrUpdateNote',
  async (note: Note) => {
    const session = await getSession();
    if (!session) {
      throw new Error('Required login');
    }
    const userId = session?.session.user._id;
    const { data } = await axios.post('/api/users/notes/add', { note, userId: userId });
    return data;
  }
);

const initialState: NotesState = {
  selectedNote: {
    listName: undefined,
    title: undefined
  },
  isLoading: false,
  error: undefined
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedNote(state, action) {
      state.selectedNote.listName = action.payload.list_name;
      state.selectedNote.title = action.payload.title;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addOrUpdateNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrUpdateNote.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(addOrUpdateNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;
