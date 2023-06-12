import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import classes from './Debugger.module.scss';
import Button from '../Button';
import Alert from '../Alert';
import { NotificationType } from '@/types/dataTypes';
import CodeEditor from './CodeEditor';

const socket = io('http://localhost:5000');

const Debugger = () => {
  const [inputVal, setInputVal] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    socket.on('startDebugging', (data) => {
      setMessage(data);
    });

    socket.on('stepIn', (data) => {

    });
    socket.on('stepOver', (data) => {

    });
    socket.on('stepOut', (data) => {

    });
    socket.on('stopDebugging', (data) => {

    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const sendMessage = () => {
  //   // console.log('sending message ', inputVal);
  //   socket.emit('sendMessage', inputVal);
  //   setInputVal('');
  // };

  const handleStartDebugging = () => {
    console.log('sending message ', inputVal);
    socket.emit('startDebugging', inputVal);
    setInputVal('');
  };

  const handleStepIn = () => {
    socket.emit('stepIn');
  }

  const handleStepOver = () => {
    socket.emit('stepOver');
  }

  const handleStepOut = () => {
    socket.emit('stepOut');
  }

  const handleExit = () => {
    socket.emit('stopDebugging');
  };

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
      <h1>{message}</h1>
      {/* <CodeEditor
        value=""
        language="python"
        setCodeInput={setCodeInput}
        height="500px"
        options={{ fontSize: 14, tabSize: 4, readOnly: false }}
      /> */}
    </div>
  );
};

export default Debugger;
