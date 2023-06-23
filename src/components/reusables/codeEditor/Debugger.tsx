import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  setDebuggingData,
  setCurrentDebuggingLineNumber,
  setDebugging,
  setExitingDebugging,
  setDebuggingStarted
} from '@/store';
import useDebugger from '@/hooks/useDebugger';
import { NotificationType, SocketType } from '@/types/dataTypes';
import Alert from '../Alert';
import DebuggingResizable from './DebuggerInfoResizable';
import PlusIcon from '@/components/icons/PlusIcon';
import Tooltip from '../Tooltip';
import classes from './Debugger.module.scss';
import XIcon from '@/components/icons/XIcon';

type DebuggerProps = {
  socketConnection: SocketType;
  setSocketConnection: Dispatch<SetStateAction<SocketType>>;
};

const Debugger: React.FC<DebuggerProps> = ({
  socketConnection,
  setSocketConnection
}) => {
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [localVarsHeight, setLocalVarsHeight] = useState(200);
  const [watchVarsHeight, setWatchVarsHeight] = useState(200);
  const [addingWatchVar, setAddingWatchVar] = useState(false);
  const [watchVariableInput, setWatchVariableInput] = useState('');
  const [hoveredWatchVar, setHoveredWatchVar] = useState(-1);
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const addWatchVarButtonRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { handleAddWatchVariables, handleRemoveWatchVariables } = useDebugger();

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !addWatchVarButtonRef.current?.contains(event.target as Node)
      ) {
        setAddingWatchVar(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('click', handleOutsideClick);
      };
    } else {
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, []);

  useEffect(() => {
    if (windowHeight) {
      setLocalVarsHeight(Math.min(windowHeight * 0.2, 200));
      setWatchVarsHeight(Math.min(windowHeight * 0.2, 200));
    }
  }, [windowHeight]);

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
      if (data === 'stop') {
        const newDebuggingData = {
          codeLine: '',
          callStack: [],
          localVariables: {},
          stdOut: debuggingData.stdOut,
          watchVariables: {}
        };
        dispatch(setDebuggingData(newDebuggingData));
        dispatch(setCurrentDebuggingLineNumber(0));
        dispatch(setDebuggingStarted(false));
      }
    });
    socket.on('addWatchVariables', (data) => {
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

    socket.on('removeWatchVariables', (data) => {
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

    socket.on('error', (error) => {
      setNotification({ status: 'error', message: 'Something went wrong.' });
      setShowAlert(true);
      console.error('Socket error:', error);
    });

    socket.on('exit', (data) => {
      if (data === 'disconnecting') {
        dispatch(setDebugging(false));
        dispatch(setExitingDebugging(false));
        setSocketConnection(null);
        dispatch(
          setDebuggingData({
            codeLine: '',
            callStack: [],
            localVariables: {},
            stdOut: [],
            watchVariables: {}
          })
        );
        dispatch(setCurrentDebuggingLineNumber(0));
        dispatch(setDebuggingStarted(false));
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
        dispatch(
          setDebuggingData({
            codeLine: '',
            callStack: [],
            localVariables: {},
            stdOut: [],
            watchVariables: {}
          })
        );
        dispatch(setCurrentDebuggingLineNumber(0));
        dispatch(setDebuggingStarted(false));
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
    let isError = false;

    const excludedPatterns = ['function', 'None', 'True', 'False', 'deque', 'Counter'];

    if (typeof value === 'object') {
      formatValue = JSON.stringify(value);
    } else if (
      typeof value === 'string' &&
      /<.*?>/g.exec(value) === null &&
      excludedPatterns.every((el) => !value.includes(el))
    ) {
      formatValue = `'${value}'`;
    } else if (/^\*\*.*Error:.*\*\*$/.exec(value)) {
      formatValue = value.replace(/raised/g, '');
      isError = true;
    } else {
      formatValue = value;
    }

    renderedLocalVariables.push(
      <p key={`${key}-${formatValue}`}>
        {key}:{' '}
        <span
          className={`${classes[`local-variables__value--${theme}`]} ${
            isError ? 'italic text-red-500' : ''
          }`}
        >
          {formatValue}
        </span>
      </p>
    );
  }

  const re = /^\*\*.*Error:.*\*\*$/;
  const renderedWatchVariables = watchVars.map((el, index) => (
    <div
      key={`${el}-${index}`}
      className={`${classes['watch-variable']} ${
        hoveredWatchVar === index ? classes[`watch-variable--${theme}`] : ''
      }`}
      onMouseEnter={() => setHoveredWatchVar(index)}
      onMouseLeave={() => setHoveredWatchVar(-1)}
    >
      {/* <p className={classes[`watch-variable__key`]}>{el}:</p> */}
      <p>
        {el}:
        <span
          className={`${classes[`watch-variable__value--${theme}`]} ${
            re.exec(debuggingData.watchVariables[el])
              ? classes['watch-var__error']
              : ''
          }`}
        >
          {debuggingData.watchVariables.hasOwnProperty(el) ? (
            re.exec(debuggingData.watchVariables[el]) ? (
              debuggingData.watchVariables[el].replace('raised', '')
            ) : (
              debuggingData.watchVariables[el]
            )
          ) : (
            <span className="italic opacity-75">not available</span>
          )}
        </span>
      </p>
      {hoveredWatchVar === index && (
        <span
          className={classes['watch-var-remove__button']}
          onClick={() =>
            handleRemoveWatchVariables(socketConnection, el, watchVars)
          }
        >
          <XIcon width={13} height={13} />
        </span>
      )}
    </div>
  ));

  const handleWatchVarFormSubmit = () => {
    if (!watchVariableInput.length) {
      setNotification({
        status: 'warning',
        message: 'Expression must be at least 1 character'
      });
      setShowAlert(true);
    } else {
      handleAddWatchVariables(socketConnection, watchVariableInput, watchVars);
    }
    setAddingWatchVar(false);
    setWatchVariableInput('');
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={notification?.status!}
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message!}
        </Alert>
      )}
      <div
        className={`debugger ${theme} ${classes.debugger} ${
          classes[`debugger--${theme}`]
        }`}
      >
        {windowHeight && (
          <>
            <DebuggingResizable
              height={localVarsHeight}
              setHeight={setLocalVarsHeight}
              minHeight={Math.min(windowHeight * 0.2, 200)}
              maxHeight={Math.max(windowHeight * 0.4, 200)}
            >
              <div
                className={`${classes['local-variables']} ${
                  classes[`local-variables--${theme}`]
                }`}
              >
                <h2>Local Variables</h2>
                <div
                  className={classes['local-variables__content']}
                  style={{ maxHeight: `${localVarsHeight - 45}px` }}
                >
                  {renderedLocalVariables}
                </div>
              </div>
            </DebuggingResizable>
            <DebuggingResizable
              height={watchVarsHeight}
              setHeight={setWatchVarsHeight}
              minHeight={Math.min(windowHeight * 0.2, 200)}
              maxHeight={Math.max(windowHeight * 0.4, 200)}
            >
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
                    <div
                      ref={addWatchVarButtonRef}
                      className={`${classes.add} ${classes[`add--${theme}`]}`}
                      onClick={() => setAddingWatchVar(true)}
                    >
                      <PlusIcon />
                    </div>
                  </Tooltip>
                </div>
                <div
                  className={classes['watch-variables__content']}
                  style={{ maxHeight: `${watchVarsHeight - 45}px` }}
                >
                  {renderedWatchVariables}
                  {addingWatchVar && (
                    <form
                      className={classes['watch-variable__add']}
                      onSubmit={handleWatchVarFormSubmit}
                    >
                      <input
                        ref={inputRef}
                        placeholder="Expression to watch"
                        spellCheck={false}
                        className={`${classes['variable-input']} ${
                          classes[`variable-input--${theme}`]
                        }`}
                        autoFocus={true}
                        value={watchVariableInput}
                        onChange={(e) => setWatchVariableInput(e.target.value)}
                      />
                    </form>
                  )}
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
            {debuggingData.callStack.map((el, index) => (
              <p key={`${el}-${index}`}>{el}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Debugger;
