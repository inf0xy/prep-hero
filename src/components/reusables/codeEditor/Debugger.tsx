import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Button from '../Button';
import Alert from '../Alert';
import { NotificationType } from '@/types/dataTypes';
import classes from './Debugger.module.scss';
import DebuggingResizable from './DebuggerInfoResizable';
import PlusIcon from '@/components/icons/PlusIcon';
import Tooltip from '../Tooltip';
import { useAppSelector } from '@/hooks/hooks';

type DebuggingData = {
  codeLine: string;
  callStack: string[];
  localVariables: { [key: string]: any };
  stdOut: string[];
  watchVariables: { [key: string]: string };
};

const Debugger = () => {
  const [breakpoints, setBreakpoitns] = useState('');
  const [watchVariablesInput, setWatchVariablesInput] = useState('');
  const [watchVars, setWatchVars] = useState<string[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [debuggingData, setDebuggingData] = useState<DebuggingData>({
    codeLine: '',
    callStack: [],
    localVariables: {},
    stdOut: [],
    watchVariables: {}
  });
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  const { theme } = useAppSelector((state) => state.theme);
  const router = useRouter();

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const handleResize = () => {
    setWindowHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('startDebugging', (data) => {
      if (data) {
        const { codeLine, callStack, localVariables, stdOut, watchVariables } =
          JSON.parse(data);
        setDebuggingData({
          codeLine,
          callStack: callStack.reverse(),
          localVariables,
          stdOut,
          watchVariables
        });
      } else {
        setDebuggingData({
          codeLine: '',
          callStack: [],
          localVariables: {},
          stdOut: [],
          watchVariables: {}
        });
      }
    });

    socketRef.current.on('stepIn', (data) => {
      const { codeLine, callStack, localVariables, stdOut, watchVariables } =
        JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
    });
    socketRef.current.on('stepOver', (data) => {
      const { codeLine, callStack, localVariables, stdOut, watchVariables } =
        JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
    });
    socketRef.current.on('stepOut', (data) => {
      const { codeLine, callStack, localVariables, stdOut, watchVariables } =
        JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables,
        stdOut,
        watchVariables
      });
    });
    socketRef.current.on('restart', (data) => {
      setDebuggingData((prev) => ({
        codeLine: '',
        callStack: [],
        localVariables: {},
        stdOut: [],
        watchVariables: prev.watchVariables
      }));
    });
    socketRef.current.on('stopDebugging', (data) => {
      if (data === 'done') {
        router.replace('/problems');
      }
    });
    socketRef.current.on('addWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);

      setDebuggingData((prev) => ({
        codeLine: prev.codeLine,
        callStack: prev.callStack,
        localVariables: prev.localVariables,
        stdOut: prev.stdOut,
        watchVariables
      }));
    });

    socketRef.current.on('removeWatchVariables', (data) => {
      const { watchVariables } = JSON.parse(data);
      setDebuggingData((prev) => ({
        codeLine: prev.codeLine,
        callStack: prev.callStack,
        localVariables: prev.localVariables,
        stdOut: prev.stdOut,
        watchVariables
      }));
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [router]);

  const handleStartDebugging = (socket: Socket) => {
    setDebuggingData({
      codeLine: '',
      callStack: [],
      localVariables: {},
      stdOut: [],
      watchVariables: {}
    });
    const debuggingBreakpoints = breakpoints.split(',').map((el) => +el.trim());
    socket.emit(
      'startDebugging',
      JSON.stringify({ code: codeInput, breakpoints: debuggingBreakpoints })
    );
    setBreakpoitns('');
  };

  const handleStepIn = () => {
    if (socketRef.current) {
      socketRef.current.emit('stepIn', JSON.stringify({ watchVars }));
    }
  };

  const handleStepOver = () => {
    if (socketRef.current) {
      socketRef.current.emit('stepOver', JSON.stringify({ watchVars }));
    }
  };

  const handleStepOut = () => {
    if (socketRef.current) {
      socketRef.current.emit('stepOut', JSON.stringify({ watchVars }));
    }
  };

  const handleRestart = () => {
    if (socketRef.current) {
      socketRef.current.emit('restart', JSON.stringify({ watchVars }));
    }
  };

  const handleExit = () => {
    if (socketRef.current) {
      socketRef.current.emit('stopDebugging');
    }
  };

  const handleAddWatchVariables = () => {
    if (socketRef.current) {
      socketRef.current.emit(
        'addWatchVariables',
        JSON.stringify({ watchVars: [...watchVars, watchVariablesInput] })
      );
      setWatchVars((prev) => [...prev, watchVariablesInput]);
    }
    setWatchVariablesInput('');
  };

  const handleRemoveWatchVariables = (variable: string) => {
    const currentWatchVariables = watchVars.filter((el) => el !== variable);
    if (socketRef.current) {
      socketRef.current.emit(
        'removeWatchVariables',
        JSON.stringify({ watchVars: currentWatchVariables })
      );
      setWatchVars(currentWatchVariables);
    }
  };

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
