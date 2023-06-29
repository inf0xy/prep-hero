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
import SettingsIcon from '@/components/icons/SettingsIcon';
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
    debuggingStarted,
    actionAvailable
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const {
      debuggingCode,
      breakpoints,
      watchVars,
      debuggingStarted,
      actionAvailable
    } = state.debugger;
    return {
      theme,
      debuggingCode,
      breakpoints,
      watchVars,
      debuggingStarted,
      actionAvailable
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
  console.log(actionAvailable);
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
      <div
        className={`${classes['debugging-menu']} ${
          classes[`debugging-menu--${theme}`]
        }`}
      >
        <ul
          className={`${classes['debugging-actions']} ${
            classes[`debugging-actions--${theme}`]
          } ${!actionAvailable ? classes['action-unavailable'] : ''}`}
        >
          {!actionAvailable && <li className={classes['action-panel-cover']} />}
          {debuggingStarted ? (
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
                dispatch(setDebuggingStarted(true));
                handleStartDebugging(
                  socketConnection,
                  debuggingCode,
                  breakpoints
                );
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
              <DocumentIcon width={7} height={7} />
            </Tooltip>
          </li>
          <li>
            <Tooltip
              text="Settings"
              direction="bottom"
              className="left-[-0.5rem] w-[8rem] px-6 py-4"
            >
              <label htmlFor="modal-settings" className="cursor-pointer">
                <SettingsIcon width="8" height="8" />
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
