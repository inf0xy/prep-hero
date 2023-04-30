import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUserData } from './slices/userSlice';
import notesSlice, {
  setSelectedNote,
  addOrUpdateNote,
  deleteNote
} from './slices/notesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  fetchUserData,
  setSelectedNote,
  addOrUpdateNote,
  deleteNote
};
