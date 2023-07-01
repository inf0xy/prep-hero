import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  fetchUserData,
  addProblemToList,
  removeProblemFromList,
  resetList,
  saveSubmittedCode,
  setDuration,
  setTimerDuration,
  setTimerReminder
} from './slices/userSlice';
import notesSlice, {
  setSelectedNote,
  addOrUpdateNote,
  deleteNote,
  renameFolder,
  deleteFolder,
  renameNote
} from './slices/notesSlice';
import problemsReducer, {
  setSelectedProblem,
  addProblem,
  updateProblem,
  getProblemCounts
} from './slices/problemsSlice';
import debuggerReducer, {
  setDebugging,
  setDebuggingCode,
  setBreakpoints,
  setDebuggingData,
  setCurrentDebuggingLineNumber,
  setWatchVars,
  setExitingDebugging,
  setDebuggingStarted,
  setHasDebuggingError,
  setActionAvailable
} from './slices/debuggerSlice';
import themeReducer, { setTheme, getTheme } from './slices/themeSlice';
import navigateReducer, {
  setNavigateDestination,
  toggleSavedList,
  setHomePageLoading,
  setShowUserMenu,
  setShowProblemCodeEditor
} from './slices/navigateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesSlice,
    problems: problemsReducer,
    debugger: debuggerReducer,
    theme: themeReducer,
    navigate: navigateReducer
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
  setDuration,
  setTimerDuration,
  setTimerReminder,
  setSelectedNote,
  addOrUpdateNote,
  deleteNote,
  renameFolder,
  deleteFolder,
  renameNote,
  setSelectedProblem,
  addProblem,
  updateProblem,
  getProblemCounts,
  setDebugging,
  setDebuggingCode,
  setBreakpoints,
  setDebuggingData,
  setCurrentDebuggingLineNumber,
  setWatchVars,
  setExitingDebugging,
  setDebuggingStarted,
  setHasDebuggingError,
  setActionAvailable,
  setTheme,
  getTheme,
  setNavigateDestination,
  toggleSavedList,
  setHomePageLoading,
  setShowUserMenu,
  setShowProblemCodeEditor
};
