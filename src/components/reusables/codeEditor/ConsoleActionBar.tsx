import { useState, Dispatch, SetStateAction } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { setDebugging } from '@/store';
import Button from '../Button';
import Alert from '../Alert';
import { NotificationType, SocketType } from '@/types/dataTypes';
import ChevronDown from '@/components/icons/ChevronDown';
import Tooltip from '../Tooltip';
import DebugIcon from '@/components/icons/DebugIcon';
import ExitIcon from '@/components/icons/ExitIcon';
import variables from '@/styles/variables.module.scss';
import classes from './ConsoleActionBar.module.scss';
import LoadingInfinityIcon from '@/components/icons/LoadingInfinityIcon';
import useDebugger from '@/hooks/useDebugger';

type ConsoleActionBarProps = {
  showConsole: boolean;
  isLoading: boolean;
  reviewCode: { code: string; language: string } | undefined;
  language: string;
  codeInputPython: string | undefined;
  codeInputJavascript: string | undefined;
  socketConnection: SocketType;
  handleShowConsole: () => void;
  handleRunCodeManually: (
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined
  ) => Promise<void>;
  handleSubmission: (
    action: 'test' | 'submit',
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined,
    duration?: number,
    timer?: number
  ) => Promise<void>;
};

const ConsoleActionBar: React.FC<ConsoleActionBarProps> = ({
  showConsole,
  isLoading,
  reviewCode,
  language,
  codeInputPython,
  codeInputJavascript,
  socketConnection,
  handleShowConsole,
  handleSubmission,
  handleRunCodeManually
}) => {
  const { theme, duration, timerDuration, debugging, exitingDebugging } =
    useAppSelector((state) => {
      const { theme } = state.theme;
      const { duration, timerDuration } = state.user;
      const { debugging, breakpoints, exitingDebugging } = state.debugger;
      return {
        theme,
        duration,
        timerDuration,
        debugging,
        breakpoints,
        exitingDebugging
      };
    });
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const dispatch = useAppDispatch();
  const { handleExit } = useDebugger();

  const handleDebugButton = () => {
    if (!debugging) {
      dispatch(setDebugging(true));
    } else {
      handleExit(socketConnection);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={notification?.status!}
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message}
        </Alert>
      )}
      <div
        className={`${classes['code-actions']} ${
          classes[`code-actions--${theme}`]
        }`}
      >
        <div className={classes['left-button-group']}>
          <Button
            extraStyle={{
              padding: '0 1rem',
              backgroundColor: variables.colorGray700
            }}
            onClick={handleShowConsole}
          >
            Console
            <span className="ml-3">
              <ChevronDown
                className={`${showConsole ? classes.down : classes.up}`}
              />
            </span>
          </Button>

          <Tooltip
            text={
              !isLoading
                ? 'Execute'
                : debugging
                ? 'Unavailable during debugging'
                : 'Unavailable during execution'
            }
            direction="top"
            className={`left-[4.5rem] ${
              !isLoading ? 'w-fit' : 'w-[20rem]'
            } p-4`}
          >
            <Button
              disabled={isLoading && !debugging ? true : false}
              extraStyle={{
                backgroundColor: variables.colorSecondary200,
                padding: '0 2rem',
                height: '2.5rem',
                opacity: isLoading && !debugging ? '0.5' : '1'
              }}
              onClick={() =>
                handleRunCodeManually(
                  reviewCode,
                  language,
                  codeInputPython,
                  codeInputJavascript
                )
              }
            >
              Execute
            </Button>
          </Tooltip>
        </div>
        <div className="flex space-x-5">
          {!exitingDebugging ? (
            <Tooltip
              text={debugging ? 'Exit' : 'Debug'}
              direction="top"
              className="w-fit px-6 py-4 left-4"
            >
              <button
                onClick={handleDebugButton}
                className={`${
                  debugging ? 'translate-y-[3px]' : 'translate-y-[2px]'
                }`}
              >
                {debugging ? (
                  <ExitIcon width={17} height={17} />
                ) : (
                  <DebugIcon width={21} height={21} />
                )}
              </button>
            </Tooltip>
          ) : (
            <Tooltip
              text="Exiting debugging"
              direction="top"
              className="w-[14rem] py-4 left-4"
            >
              <LoadingInfinityIcon width={21} height={21} />
            </Tooltip>
          )}
          <Button
            disabled={isLoading && !debugging ? true : false}
            extraStyle={{
              backgroundColor: variables.colorGray500,
              padding: '0 2rem',
              opacity: isLoading && !debugging ? '0.5' : '1'
            }}
            onClick={() =>
              handleSubmission(
                'test',
                reviewCode,
                language,
                codeInputPython,
                codeInputJavascript
              )
            }
          >
            Run
          </Button>
          <Button
            disabled={isLoading && !debugging ? true : false}
            extraStyle={{
              backgroundColor: variables.colorPrimary200,
              padding: '0 2rem',
              opacity: isLoading && !debugging ? '0.5' : '1'
            }}
            onClick={() =>
              handleSubmission(
                'submit',
                reviewCode,
                language,
                codeInputPython,
                codeInputJavascript,
                duration,
                timerDuration
              )
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConsoleActionBar;
