import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import classes from './Debugger.module.scss';
import Button from '../Button';
import Alert from '../Alert';
import { NotificationType } from '@/types/dataTypes';
import CodeEditor from './CodeEditor';
import { useRouter } from 'next/router';

const socket = io('http://localhost:5000');

type DebuggingData = {
  codeLine: string;
  callStack: string[];
  localVariables: { [key: string]: any };
};

const Debugger = () => {
  const [inputVal, setInputVal] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [debuggingData, setDebuggingData] = useState<DebuggingData>({
    codeLine: '',
    callStack: [],
    localVariables: {}
  });

  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    socket.on('startDebugging', (data) => {
      const { codeLine, callStack, localVariables } = JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables
      });
    });

    socket.on('stepIn', (data) => {
      const { codeLine, callStack, localVariables } = JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables
      });
    });
    socket.on('stepOver', (data) => {
      console.log(data);
      const { codeLine, callStack, localVariables } = JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables
      });
    });
    socket.on('stepOut', (data) => {
      const { codeLine, callStack, localVariables } = JSON.parse(data);
      setDebuggingData({
        codeLine,
        callStack: callStack.reverse(),
        localVariables
      });
    });
    socket.on('stopDebugging', (data) => {
      if (data === 'done') {
        router.replace('/problems');
      }
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  // const sendMessage = () => {
  //   // console.log('sending message ', inputVal);
  //   socket.emit('sendMessage', inputVal);
  //   setInputVal('');
  // };

  const handleStartDebugging = () => {
    setDebuggingData({
      codeLine: '',
      callStack: [],
      localVariables: {}
    });
    console.log('sending message ', inputVal);
    socket.emit('startDebugging', inputVal);
    setInputVal('');
  };

  const handleStepIn = () => {
    socket.emit('stepIn');
  };

  const handleStepOver = () => {
    socket.emit('stepOver');
  };

  const handleStepOut = () => {
    socket.emit('stepOut');
  };

  const handleExit = () => {
    socket.emit('stopDebugging');
  };

  const renderedLocalVariables = [];
  for (const [key, value] of Object.entries(debuggingData.localVariables)) {
    console.log(
      'key :',
      key,
      ' value: ',
      value,
      ' array value: ',
      Array.isArray(value)
    );
    renderedLocalVariables.push(
      <p key={key}>
        {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
      </p>
    );
  }

  return (
    <div className={classes.debugger}>
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
          status={notification?.status!}
        >
          {notification?.message}
        </Alert>
      )}
      <label>Message</label>
      <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <Button onClick={handleStartDebugging}>Start</Button>
      <Button onClick={handleStepIn}>Step In</Button>
      <Button onClick={handleStepOver}>Step Over</Button>
      <Button onClick={handleStepOut}>Step Out</Button>
      <Button onClick={handleExit}>Exit</Button>
      <div className="flex flex-col space-y-4">
        <h1>Code Line:</h1>
        <p>{debuggingData.codeLine}</p>
      </div>
      <div className="flex flex-col space-y-4">
        <h1>Local Variables:</h1>
        <div className="flex flex-col space-y-3">{renderedLocalVariables}</div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1>Call Stack:</h1>
        <div className="flex flex-col space-y-3">
          {debuggingData.callStack.map((el) => (
            <p key={el}>{el}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

// {/* <CodeEditor
//   value=""
//   language="python"
//   setCodeInput={setCodeInput}
//   height="500px"
//   options={{ fontSize: 14, tabSize: 4, readOnly: false }}
// /> */}


export default Debugger;


