import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Note } from '@/types/dataTypes';

interface NotesState {
  selectedNote: {
    listName: string[] | undefined;
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

export const renameNote = createAsyncThunk(
  'notes/renameNote',
  async (noteNames: { oldTitle: string, newTitle: string}, { rejectWithValue }) => {
    const session = await getSession();
    if (!session) {
      return rejectWithValue(new Error('Required login'));
    }

    const userId = session?.session.user._id;
    const { data } = await axios.put('/api/users/notes/rename-note', { noteNames, userId });
    return data;
  }
);

export const renameFolder = createAsyncThunk(
  'notes/renameFolder',
  async (
    folderNames: { oldFolderName: string; newFolderName: string },
    { rejectWithValue }
  ) => {
    const session = await getSession();
    if (!session) {
      return rejectWithValue(new Error('Required login'));
    }

    const userId = session?.session.user._id;
    const { data } = await axios.put('/api/users/notes/rename-folder', {
      folderNames,
      userId
    });
    return data;
  }
);

export const deleteFolder = createAsyncThunk(
  'notes/deleteFolder', async (
    folderName: string,
    { rejectWithValue }
  ) => {
    const session = await getSession();
    if (!session) {
      return rejectWithValue(new Error('Required login'));
    }

    const userId = session?.session.user._id;
    const { data } = await axios.delete('/api/users/notes/delete-folder', {
      params: { folderName, userId }
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
      state.selectedNote.listName = action.payload.list_names;
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
    builder.addCase(renameFolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(renameFolder.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(renameFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteFolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFolder.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(deleteFolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(renameNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(renameNote.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(renameNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;
