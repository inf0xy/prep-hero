import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Alert from '../Alert';
import { NotificationType, DebuggingData, SocketType } from '@/types/dataTypes';
import classes from './Debugger.module.scss';
import DebuggingResizable from './DebuggerInfoResizable';
import PlusIcon from '@/components/icons/PlusIcon';
import Tooltip from '../Tooltip';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  setDebuggingData,
  setCurrentDebuggingLineNumber,
  setDebugging,
  setExitingDebugging,
  setDebuggingStarted
} from '@/store';
import useDebugger from '@/hooks/useDebugger';

type DebuggerProps = {
  setSocketConnection: Dispatch<SetStateAction<SocketType>>;
};

const Debugger: React.FC<DebuggerProps> = ({ setSocketConnection }) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { theme, breakpoints, debuggingData, watchVars } = useAppSelector(
    (state) => {
      const { theme } = state.theme;
      const { breakpoints, debuggingData, watchVars } = state.debugger;
      return { theme, breakpoints, debuggingData, watchVars };
    }
  );

  const dispatch = useAppDispatch();
  const { handleRemoveWatchVariables } = useDebugger();

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    setSocketConnection(socket);

    socket.on('startDebugging', (data) => {
      if (data) {
        const {
          currentLineNumber,
          codeLine,
          callStack,
          localVariables,
          stdOut,
          watchVariables
        } = JSON.parse(data);
        dispatch(
          setDebuggingData({
            codeLine,
            callStack: callStack.reverse(),
            localVariables,
            stdOut,
            watchVariables
          })
        );
        if (currentLineNumber >= 0) {
          if (currentLineNumber === 0) {
            dispatch(setDebuggingStarted(false));
          }
          dispatch(setCurrentDebuggingLineNumber(currentLineNumber));
        }
      } else {
        const newDebuggingData = {
          codeLine: '',
          callStack: [],
          localVariables: {},
          stdOut: [],
          watchVariables: {}
        };
        dispatch(setDebuggingData(newDebuggingData));
        dispatch(setCurrentDebuggingLineNumber(breakpoints[0]));
      }
    });

    socket.on('stepIn', (data) => {
      const {
        currentLineNumber,
        codeLine,
        callStack,
        localVariables,
        stdOut,
        watchVariables
      } = JSON.parse(data);
      const newDebuggingData = {
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      };
      dispatch(setDebuggingData(newDebuggingData));
      if (currentLineNumber >= 0) {
        if (currentLineNumber === 0) {
          dispatch(setDebuggingStarted(false));
        }
        dispatch(setCurrentDebuggingLineNumber(currentLineNumber));
      }
    });

    socket.on('stepOver', (data) => {
      const {
        currentLineNumber,
        codeLine,
        callStack,
        localVariables,
        stdOut,
        watchVariables
      } = JSON.parse(data);
      const newDebuggingData = {
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      };
      dispatch(setDebuggingData(newDebuggingData));
      if (currentLineNumber >= 0) {
        if (currentLineNumber === 0) {
          dispatch(setDebuggingStarted(false));
        }
        dispatch(setCurrentDebuggingLineNumber(currentLineNumber));
      }
    });

    socket.on('stepOut', (data) => {
      const {
        currentLineNumber,
        codeLine,
        callStack,
        localVariables,
        stdOut,
        watchVariables
      } = JSON.parse(data);
      const newDebuggingData = {
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      };
      dispatch(setDebuggingData(newDebuggingData));
      if (currentLineNumber >= 0) {
        if (currentLineNumber === 0) {
          dispatch(setDebuggingStarted(false));
        }
        dispatch(setCurrentDebuggingLineNumber(currentLineNumber));
      }
    });

    socket.on('restart', (data) => {});

    socket.on('stopDebugging', (data) => {
      const resetCallStack = debuggingData.callStack.slice(1);
      if (data === 'stop') {
        const newDebuggingData = {
          codeLine: '',
          callStack: resetCallStack,
          localVariables: {},
          stdOut: [],
          watchVariables: {}
        };
        dispatch(setDebuggingData(newDebuggingData));
        dispatch(setCurrentDebuggingLineNumber(0));
        dispatch(setDebuggingStarted(false));
      }
    });
    socket.on('addWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);
      const newDebuggingData = {
        codeLine: debuggingData.codeLine,
        callStack: debuggingData.callStack,
        localVariables: debuggingData.localVariables,
        stdOut: debuggingData.stdOut,
        watchVariables
      };

      dispatch(setDebuggingData(newDebuggingData));
    });

    socket.on('removeWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);
      const newDebuggingData = {
        codeLine: debuggingData.codeLine,
        callStack: debuggingData.callStack,
        localVariables: debuggingData.localVariables,
        stdOut: debuggingData.stdOut,
        watchVariables
      };
      dispatch(setDebuggingData(newDebuggingData));
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('exit', (data) => {
      if (data === 'disconnecting') {
        dispatch(setDebugging(false));
        dispatch(setExitingDebugging(false));
        setSocketConnection(null);
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    breakpoints,
    setCurrentDebuggingLineNumber,
    setDebugging,
    setDebuggingData,
    setSocketConnection
  ]);

  const renderedLocalVariables = [];
  for (const [key, value] of Object.entries(debuggingData.localVariables)) {
    let formatValue;
    if (typeof value === 'object') {
      formatValue = JSON.stringify(value);
    } else if (typeof value === 'string' && value !== 'function') {
      formatValue = `'${value}'`;
    } else {
      formatValue = value;
    }

    renderedLocalVariables.push(
      <p key={key}>
        {key}: <span className={classes[`local-variables__value--${theme}`]}>{formatValue}</span>
      </p>
    );
  }

  const renderedWatchVariables = watchVars.map((el, index) => (
    <div key={index} className="flex space-x-8">
      <p>{el}:</p>
      <p>
        {debuggingData.watchVariables.hasOwnProperty(el)
          ? debuggingData.watchVariables[el]
          : ''}
      </p>
      <span className="text-xl" onClick={() => handleRemoveWatchVariables(el)}>
        X
      </span>
    </div>
  ));

  return (
    <div
      className={`debugger ${theme} ${classes.debugger} ${
        classes[`debugger--${theme}`]
      }`}
    >
      {windowHeight && (
        <>
          <DebuggingResizable minHeight={200} maxHeight={windowHeight * 0.3}>
            <div
              className={`${classes['local-variables']} ${
                classes[`local-variables--${theme}`]
              }`}
            >
              <h2>Local Variables</h2>
              <div className={classes['local-variables__content']}>
                {renderedLocalVariables}
              </div>
            </div>
          </DebuggingResizable>
          <DebuggingResizable minHeight={200} maxHeight={windowHeight * 0.4}>
            <div
              className={`${classes['watch-variables']} ${
                classes[`watch-variables--${theme}`]
              }`}
            >
              <div className={classes['watch-variables__actions']}>
                <h2>Watch</h2>
                <div>{renderedWatchVariables}</div>
                <Tooltip
                  text="Add expression"
                  direction="top"
                  className="w-[12rem] p-4 left-[-2.5rem] bottom-[100%]"
                  extraStyle={{ bottom: '90%' }}
                >
                  <div className={classes.add}>
                    <PlusIcon />
                  </div>
                </Tooltip>
              </div>
            </div>
          </DebuggingResizable>
        </>
      )}
      <div
        className={`${classes['call-stack']} ${
          classes[`call-stack--${theme}`]
        }`}
      >
        <h2>Call Stack</h2>
        <div className={classes['callstack__content']}>
          {debuggingData.callStack.map((el) => (
            <p key={el}>{el}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Debugger;
