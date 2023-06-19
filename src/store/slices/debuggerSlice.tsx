import { createSlice } from '@reduxjs/toolkit';
import { DebuggingData } from '@/types/dataTypes';

interface DebuggerState {
  debugging: boolean;
  debuggingCode: string;
  breakpoints: number[];
  debuggingData: DebuggingData;
  currentDebuggingLineNumber: number;
  watchVars: string[];
  watchVariablesInput: string[];
  exitingDebugging: boolean;
  debuggingStarted: boolean;
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
  watchVariablesInput: [],
  exitingDebugging: false,
  debuggingStarted: false,
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
    setWatchVariablesInput(state, action) {
      state.watchVariablesInput = action.payload;
    },
    setExitingDebugging(state, action) {
      state.exitingDebugging = action.payload;
    },
    setDebuggingStarted(state, action) {
      state.debuggingStarted = action.payload;
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
  setWatchVariablesInput,
  setExitingDebugging,
  setDebuggingStarted
} = debuggerSlice.actions;

export default debuggerSlice.reducer;
