import { useCallback } from 'react';
import { useAppDispatch } from './hooks';
import {
  setDebugging,
  setDebuggingData,
  setExitingDebugging,
  setWatchVars,
  setCurrentDebuggingLineNumber,
  setDebuggingStarted
} from '@/store';
import { SocketType } from '@/types/dataTypes';

const useDebugger = () => {
  const dispatch = useAppDispatch();

  const handleStartDebugging = useCallback(
    (
      socketConnection: SocketType,
      debuggingCode: string,
      breakpoints: number[]
    ) => {
      if (breakpoints.length === 0) {
      }

      const data = {
        codeLine: '',
        callStack: [],
        localVariables: {},
        stdOut: [],
        watchVariables: {}
      };

      dispatch(setDebuggingData(data));

      if (socketConnection) {
        const debuggingData = {
          code: debuggingCode,
          breakpoints
        };
        socketConnection.emit('startDebugging', JSON.stringify(debuggingData));
      }
    },
    [dispatch]
  );

  const handleStopDebugging = useCallback((socketConnection: SocketType) => {
    if (socketConnection) {
      socketConnection.emit('stopDebugging');
    }
  }, []);

  const handleStepIn = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        socketConnection.emit('stepIn', JSON.stringify({ watchVars }));
      }
    },
    []
  );

  const handleStepOver = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        socketConnection.emit('stepOver', JSON.stringify({ watchVars }));
      }
    },
    []
  );

  const handleStepOut = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        socketConnection.emit('stepOut', JSON.stringify({ watchVars }));
      }
    },
    []
  );

  const handleRestart = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        socketConnection.emit('restart', JSON.stringify({ watchVars }));
      }
    },
    []
  );

  const handleExit = useCallback(
    (socketConnection: SocketType) => {
      if (socketConnection) {
        dispatch(setExitingDebugging(true));
        socketConnection.emit('exit');
      }
    },
    [dispatch]
  );

  const handleAddWatchVariables = useCallback(
    (
      socketConnection: SocketType,
      watchVariableInput: string,
      watchVars: string[]
    ) => {
      const newWatchVars = [...watchVars, watchVariableInput];
      if (socketConnection) {
        socketConnection.emit(
          'addWatchVariables',
          JSON.stringify({ watchVars: newWatchVars })
        );
      }
      dispatch(setWatchVars(newWatchVars));
    },
    [dispatch]
  );

  const handleRemoveWatchVariables = useCallback(
    (socketConnection: SocketType, variable: string, watchVars: string[]) => {
      const currentWatchVariables = watchVars.filter((el) => el !== variable);
      if (socketConnection) {
        socketConnection.emit(
          'removeWatchVariables',
          JSON.stringify({ watchVars: currentWatchVariables })
        );
      }
      dispatch(setWatchVars(currentWatchVariables));
    },
    [dispatch]
  );

  return {
    handleStartDebugging,
    handleStopDebugging,
    handleStepIn,
    handleStepOver,
    handleStepOut,
    handleRestart,
    handleExit,
    handleAddWatchVariables,
    handleRemoveWatchVariables
  };
};

export default useDebugger;
