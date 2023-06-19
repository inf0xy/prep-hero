import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Alert from '../Alert';
import { NotificationType, DebuggingData } from '@/types/dataTypes';
import classes from './Debugger.module.scss';
import DebuggingResizable from './DebuggerInfoResizable';
import PlusIcon from '@/components/icons/PlusIcon';
import Tooltip from '../Tooltip';
import { useAppSelector } from '@/hooks/hooks';

interface DebuggerProps {
  socketConnection: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocketConnection: Dispatch<
    SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >;
  breakpoints: number[];
  setDebugging: Dispatch<SetStateAction<boolean>>;
  debuggingData: DebuggingData;
  watchVars: string[];
  setDebuggingData: Dispatch<SetStateAction<DebuggingData>>;
  setCurrentDebuggingLineNumber: Dispatch<SetStateAction<number>>;
  setExitingDebugging: Dispatch<SetStateAction<boolean>>;
  handleAddWatchVariables: () => void;
  handleRemoveWatchVariables: (val: string) => void;
}

const Debugger: React.FC<DebuggerProps> = ({
  socketConnection,
  setSocketConnection,
  breakpoints,
  setDebugging,
  debuggingData,
  watchVars,
  setDebuggingData,
  setCurrentDebuggingLineNumber,
  setExitingDebugging,
  handleAddWatchVariables,
  handleRemoveWatchVariables
}) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  const { theme } = useAppSelector((state) => state.theme);

  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [ready, setReady] = useState(true);

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
        setDebuggingData({
          codeLine,
          callStack: callStack.reverse(),
          localVariables,
          stdOut,
          watchVariables
        });
        if (currentLineNumber > 0) {
          setCurrentDebuggingLineNumber(currentLineNumber);
        }
      } else {
        setDebuggingData({
          codeLine: '',
          callStack: [],
          localVariables: {},
          stdOut: [],
          watchVariables: {}
        });
        setCurrentDebuggingLineNumber(breakpoints[0]);
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
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
      if (currentLineNumber > 0) {
        setCurrentDebuggingLineNumber(currentLineNumber);
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
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
      if (currentLineNumber > 0) {
        setCurrentDebuggingLineNumber(currentLineNumber);
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
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
      if (currentLineNumber > 0) {
        setCurrentDebuggingLineNumber(currentLineNumber);
      }
    });

    socket.on('restart', (data) => {});

    socket.on('stopDebugging', (data) => {
      const resetCallStack = debuggingData.callStack.slice(1);
      if (data === 'stop') {
        setDebuggingData({
          codeLine: '',
          callStack: resetCallStack,
          localVariables: {},
          stdOut: [],
          watchVariables: {}
        });
        setCurrentDebuggingLineNumber(0);
      }
    });
    socket.on('addWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);

      setDebuggingData((prev) => ({
        codeLine: prev.codeLine,
        callStack: prev.callStack,
        localVariables: prev.localVariables,
        stdOut: prev.stdOut,
        watchVariables
      }));
    });

    socket.on('removeWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);
      setDebuggingData((prev) => ({
        codeLine: prev.codeLine,
        callStack: prev.callStack,
        localVariables: prev.localVariables,
        stdOut: prev.stdOut,
        watchVariables
      }));
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('exit', (data) => {
      if (data === 'disconnecting') {
        setDebugging(false);
        setExitingDebugging(false);
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
        {key}: {formatValue}
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
          <DebuggingResizable minHeight={100} maxHeight={windowHeight * 0.3}>
            <div
              className={`${classes['local-variables']} ${
                classes[`local-variables--${theme}`]
              }`}
            >
              <h2>Local Variables</h2>
            </div>
          </DebuggingResizable>
          <DebuggingResizable minHeight={100} maxHeight={windowHeight * 0.4}>
            <div
              className={`${classes['watch-variables']} ${
                classes[`watch-variables--${theme}`]
              }`}
            >
              <div className={classes['watch-variables__actions']}>
                <h2>Watch</h2>
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
      </div>
    </div>
  );
};

export default Debugger;
