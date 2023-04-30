import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Note } from '@/types/dataTypes';

interface NotesState {
  selectedNote: {
    listName: string | undefined;
    title: string | undefined;
    content: string | undefined;
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
    const { data } = await axios.post('/api/users/notes/add', { note, userId });
    return data;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (title: string, { rejectWithValue }) => {
    const session = await getSession();
    if (!session) {
      return rejectWithValue(new Error('Required login'));
    }
    const userId = session?.session.user._id;
    const { data } = await axios.delete('/api/users/notes/delete', {
      params: { title, userId }
    });
    return data;
  }
);

const initialState: NotesState = {
  selectedNote: {
    listName: undefined,
    title: undefined,
    content: undefined
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
      state.selectedNote.content = action.payload.content || '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addOrUpdateNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrUpdateNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(addOrUpdateNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;
