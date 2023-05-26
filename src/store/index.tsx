import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  fetchUserData,
  addProblemToList,
  removeProblemFromList,
  resetList,
  saveSubmittedCode
} from './slices/userSlice';
import notesSlice, {
  setSelectedNote,
  addOrUpdateNote,
  deleteNote
} from './slices/notesSlice';
import problemsReducer, {
  setSelectedProblem,
  addProblem,
  updateProblem,
  getProblemCounts
} from './slices/problemsSlice';
import themeReducer, { setTheme, getTheme } from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesSlice,
    problems: problemsReducer,
    theme: themeReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  fetchUserData,
  addProblemToList,
  removeProblemFromList,
  resetList,
  saveSubmittedCode,
  setSelectedNote,
  addOrUpdateNote,
  deleteNote,
  setSelectedProblem,
  addProblem,
  updateProblem,
  getProblemCounts,
  setTheme,
  getTheme
};
