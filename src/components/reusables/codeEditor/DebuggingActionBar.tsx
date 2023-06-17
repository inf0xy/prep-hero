import { Dispatch, SetStateAction, useState } from 'react';
import { NotificationType, Submission } from '@/types/dataTypes';
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

type DebuggingActionBarProps = {
  title: string;
  setShowNote: Dispatch<SetStateAction<boolean>>;
};

const DebuggingActionBar: React.FC<DebuggingActionBarProps> = ({
  setShowNote,
  title
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { theme } = useAppSelector(state => state.theme);

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
        <ul className={`${classes['debugging-actions']} ${classes[`debugging-actions--${theme}`]}`}>
          <li><StepOverIcon width={17} height={17}/></li>
          <li><StepInIcon width={17} height={17}/></li>
          <li><StepOutIcon width={17} height={17}/></li>
          <li><DebugResetIcon width={15} height={15} /></li>
          <li><StopIcon width={21} height={21}/></li>
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
