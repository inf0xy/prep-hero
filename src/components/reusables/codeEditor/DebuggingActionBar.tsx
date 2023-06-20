import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDebuggingStarted } from '@/store';
import { NotificationType, SocketType } from '@/types/dataTypes';
import useDebugger from '@/hooks/useDebugger';
import Tooltip from '../Tooltip';
import FullScreenButton from './FullScreenButton';
import Alert from '../Alert';
import DocumentIcon from '@/components/icons/DocumentIcon';
import StepOverIcon from '@/components/icons/StepOverIcon';
import StepInIcon from '@/components/icons/StepInIcon';
import StepOutIcon from '@/components/icons/StepOutIcon';
import DebugResetIcon from '@/components/icons/DebugResetIcon';
import StopIcon from '@/components/icons/StopIcon';
import DebugPlayIcon from '@/components/icons/DebugPlayIcon';
import classes from './DebuggingActionBar.module.scss';

type DebuggingActionBarProps = {
  title: string;
  setShowNote: Dispatch<SetStateAction<boolean>>;
  socketConnection: SocketType;
};

const DebuggingActionBar: React.FC<DebuggingActionBarProps> = ({
  title,
  setShowNote,
  socketConnection
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const {
    theme,
    debuggingCode,
    breakpoints,
    watchVars,
    currentDebuggingLineNumber,
    debuggingStarted
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const {
      debuggingCode,
      breakpoints,
      watchVars,
      currentDebuggingLineNumber,
      debuggingStarted
    } = state.debugger;
    return {
      theme,
      debuggingCode,
      breakpoints,
      watchVars,
      currentDebuggingLineNumber,
      debuggingStarted
    };
  });

  const dispatch = useAppDispatch();

  const {
    handleStartDebugging,
    handleStopDebugging,
    handleStepOver,
    handleStepIn,
    handleStepOut,
    handleRestart
  } = useDebugger();

  return (
    <>
      {showAlert && (
        <Alert
          status={notification!.status!}
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message}
        </Alert>
      )}
      <div className={classes['debugging-menu']}>
        <ul
          className={`${classes['debugging-actions']} ${
            classes[`debugging-actions--${theme}`]
          }`}
        >
          {debuggingStarted && currentDebuggingLineNumber !== 0 ? (
            <li
              onClick={() => {
                handleStopDebugging(socketConnection);
                dispatch(setDebuggingStarted(false));
              }}
            >
              <StopIcon width={21} height={21} />
            </li>
          ) : (
            <li
              onClick={() => {
                handleStartDebugging(
                  socketConnection,
                  debuggingCode,
                  breakpoints
                );
                dispatch(setDebuggingStarted(true));
              }}
            >
              <DebugPlayIcon width={21} height={21} />
            </li>
          )}
          <li onClick={() => handleStepOver(socketConnection, watchVars)}>
            <StepOverIcon width={17} height={17} />
          </li>
          <li onClick={() => handleStepIn(socketConnection, watchVars)}>
            <StepInIcon width={17} height={17} />
          </li>
          <li onClick={() => handleStepOut(socketConnection, watchVars)}>
            <StepOutIcon width={17} height={17} />
          </li>
          <li onClick={() => handleRestart(socketConnection, watchVars)}>
            <DebugResetIcon width={15} height={15} />
          </li>
        </ul>
        <ul className={classes['debugging-menu__options']}>
          <li onClick={() => setShowNote(true)}>
            <Tooltip text="Note" direction="bottom" className="w-fit px-6 py-4">
              <label
                htmlFor={`modal__editor-note-${title}`}
                className="w-fit cursor-pointer"
              >
                <DocumentIcon width={7} height={7} />
              </label>
            </Tooltip>
          </li>
          <li>
            <label htmlFor="modal-settings" className="cursor-pointer">
              <FullScreenButton width={7} height={7} />
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DebuggingActionBar;
