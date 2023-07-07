import { useCallback } from 'react';
import { getSession } from 'next-auth/react';
import { useAppDispatch } from './hooks';
import {
  setDebuggingData,
  setExitingDebugging,
  setWatchVars,
  setActionAvailable
} from '@/store';
import { SocketType } from '@/types/dataTypes';

const useDebugger = () => {
  const dispatch = useAppDispatch();

  const handleStartDebugging = useCallback(
    async (
      socketConnection: SocketType,
      debuggingCode: string,
      breakpoints: number[]
    ) => {
      const data = {
        codeLine: '',
        callStack: [],
        localVariables: {},
        stdOut: [],
        watchVariables: {}
      };

      const session = await getSession();
      let userId: string;
      if (session) {
        userId = session.session.user._id;
        dispatch(setDebuggingData(data));

        if (socketConnection) {
          dispatch(setActionAvailable(false));
          const debuggingData = {
            userId,
            code: debuggingCode,
            breakpoints
          };
          socketConnection.emit(
            'startDebugging',
            JSON.stringify(debuggingData)
          );
        }
      }
    },
    [dispatch]
  );

  const handleStopDebugging = useCallback((socketConnection: SocketType) => {
    if (socketConnection) {
      dispatch(setActionAvailable(false));
      socketConnection.emit('stopDebugging');
    }
  }, [dispatch]);

  const handleStepIn = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        dispatch(setActionAvailable(false));
        socketConnection.emit('stepIn', JSON.stringify({ watchVars }));
      }
    },
    [dispatch]
  );

  const handleStepOver = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        dispatch(setActionAvailable(false));
        socketConnection.emit('stepOver', JSON.stringify({ watchVars }));
      }
    },
    [dispatch]
  );

  const handleStepOut = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        dispatch(setActionAvailable(false));
        socketConnection.emit('stepOut', JSON.stringify({ watchVars }));
      }
    },
    [dispatch]
  );

  const handleRestart = useCallback(
    (socketConnection: SocketType, watchVars: string[]) => {
      if (socketConnection) {
        dispatch(setActionAvailable(false));
        socketConnection.emit('restart', JSON.stringify({ watchVars }));
      }
    },
    [dispatch]
  );

  const handleExit = useCallback(
    (socketConnection: SocketType) => {
      if (socketConnection) {
        dispatch(setActionAvailable(false));
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
        dispatch(setActionAvailable(false));
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
        dispatch(setActionAvailable(false));
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
