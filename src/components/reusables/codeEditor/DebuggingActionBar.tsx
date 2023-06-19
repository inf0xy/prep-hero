import { Dispatch, SetStateAction, useState } from 'react';
import { NotificationType, DebuggingAction } from '@/types/dataTypes';
import Tooltip from '../Tooltip';
import FullScreenButton from './FullScreenButton';
import Alert from '../Alert';
import DocumentIcon from '@/components/icons/DocumentIcon';
import classes from './DebuggingActionBar.module.scss';
import StepOverIcon from '@/components/icons/StepOverIcon';
import StepInIcon from '@/components/icons/StepInIcon';
import StepOutIcon from '@/components/icons/StepOutIcon';
import DebugResetIcon from '@/components/icons/DebugResetIcon';
import StopIcon from '@/components/icons/StopIcon';
import { useAppSelector } from '@/hooks/hooks';
import DebugPlayIcon from '@/components/icons/DebugPlayIcon';

type DebuggingActionBarProps = {
  title: string;
  setShowNote: Dispatch<SetStateAction<boolean>>;
  handleStartDebugging: () => void;
  handleStopDebugging: () => void;
  handleStepIn: () => void;
  handleStepOver: () => void;
  handleStepOut: () => void;
  handleRestart: () => void;
  handleExit: () => void;
};

const DebuggingActionBar: React.FC<DebuggingActionBarProps> = ({
  title,
  setShowNote,
  handleStartDebugging,
  handleStopDebugging,
  handleStepIn,
  handleStepOver,
  handleStepOut,
  handleRestart,
  handleExit
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [started, setStarted] = useState(false);
  const { theme } = useAppSelector((state) => state.theme);

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
          {started ? (
            <li
              onClick={() => {
                handleStopDebugging();
                setStarted(false);
              }}
            >
              <StopIcon width={21} height={21} />
            </li>
          ) : (
            <li
              onClick={() => {
                handleStartDebugging();
                setStarted(true);
              }}
            >
              <DebugPlayIcon width={21} height={21} />
            </li>
          )}
          <li onClick={() => handleStepOver()}>
            <StepOverIcon width={17} height={17} />
          </li>
          <li onClick={() => handleStepIn()}>
            <StepInIcon width={17} height={17} />
          </li>
          <li onClick={() => handleStepOut()}>
            <StepOutIcon width={17} height={17} />
          </li>
          <li onClick={() => handleRestart()}>
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
