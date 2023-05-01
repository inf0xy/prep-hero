import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUserData } from './slices/userSlice';
import notesSlice, {
  setSelectedNote,
  addOrUpdateNote,
  deleteNote
} from './slices/notesSlice';
import problemsReducer, { setSelectedProblem, addProblem, updateProblem } from './slices/problemsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesSlice,
    problems: problemsReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  fetchUserData,
  setSelectedNote,
  addOrUpdateNote,
  deleteNote,
  setSelectedProblem,
  addProblem,
  updateProblem
};
