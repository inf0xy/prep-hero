import { createSlice } from '@reduxjs/toolkit';
import { DebuggingData } from '@/types/dataTypes';

interface DebuggerState {
  debugging: boolean;
  debuggingCode: string;
  breakpoints: number[];
  debuggingData: DebuggingData;
  currentDebuggingLineNumber: number;
  watchVars: string[];
  exitingDebugging: boolean;
  debuggingStarted: boolean;
  hasDebuggingError: boolean;
  actionAvailable: boolean;
  isLoading: boolean;
  error: undefined | string;
}

const initialState: DebuggerState = {
  debugging: false,
  debuggingCode: '',
  breakpoints: [],
  debuggingData: {
    codeLine: '',
    callStack: [],
    localVariables: {},
    stdOut: [],
    watchVariables: {}
  },
  currentDebuggingLineNumber: 0,
  watchVars: [],
  exitingDebugging: false,
  debuggingStarted: false,
  hasDebuggingError: false,
  actionAvailable: false,
  isLoading: false,
  error: undefined
};

const debuggerSlice = createSlice({
  name: 'debugger',
  initialState,
  reducers: {
    setDebugging(state, action) {
      state.debugging = action.payload;
    },
    setDebuggingCode(state, action) {
      state.debuggingCode = action.payload;
    },

    setBreakpoints(state, action) {
      state.breakpoints = action.payload;
    },
    setDebuggingData(state, action) {
      state.debuggingData = action.payload;
    },
    setCurrentDebuggingLineNumber(state, action) {
      state.currentDebuggingLineNumber = action.payload;
    },
    setWatchVars(state, action) {
      state.watchVars = action.payload;
    },
    setExitingDebugging(state, action) {
      state.exitingDebugging = action.payload;
    },
    setDebuggingStarted(state, action) {
      state.debuggingStarted = action.payload;
    },
    setHasDebuggingError(state, action) {
      state.hasDebuggingError = action.payload;
    },
    setActionAvailable(state, action) {
      state.actionAvailable = action.payload;
    }
  }
});

export const {
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
} = debuggerSlice.actions;

export default debuggerSlice.reducer;
