import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import useDebugger from '@/hooks/useDebugger';
import { setDebugging } from '@/store';
import Button from '../Button';
import Alert from '../Alert';
import { NotificationType, SocketType } from '@/types/dataTypes';
import ChevronDown from '@/components/icons/ChevronDown';
import Tooltip from '../Tooltip';
import DebugIcon from '@/components/icons/DebugIcon';
import ExitIcon from '@/components/icons/ExitIcon';
import LoadingInfinityIcon from '@/components/icons/LoadingInfinityIcon';
import variables from '@/styles/variables.module.scss';
import classes from './ConsoleActionBar.module.scss';

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
    codeInputJavascript: string | undefined,
    checkDebuggingError: boolean
  ) => Promise<{ error: any }>;
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
  const { data: session } = useSession();
  const {
    theme,
    duration,
    selectedProblem,
    testTitles,
    timerDuration,
    debugging,
    exitingDebugging
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { duration, timerDuration } = state.user;
    const { selectedProblem, testTitles } = state.problems;
    const { debugging, breakpoints, exitingDebugging } = state.debugger;
    return {
      theme,
      duration,
      selectedProblem,
      testTitles,
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

  const router = useRouter();
  const currentProblemTitle = decodeURI(router.asPath).slice(9);

  const dispatch = useAppDispatch();
  const { handleExit } = useDebugger();
  const isMobile = useMediaQuery({
    query: '(max-width: 897px)'
  });

  const handleDebugButton = async () => {
    if (!session) {
      return;
    }

    if (!debugging) {
      // check error before entering debugging session
      const { error } = await handleRunCodeManually(
        reviewCode,
        language,
        codeInputPython,
        codeInputJavascript,
        true
      );
      if (error === undefined) {
        dispatch(setDebugging(true));
      }
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
            disable={!session ? true : false}
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
              !isLoading && !debugging
                ? language === 'javascript' ? 'Unavailable' : 'Stdout'
                : debugging
                ? 'Unavailable during debugging'
                : 'Unavailable during execution'
            }
            direction="top"
            className={`left-[4.5rem] ${
              !isLoading && !debugging ? 'w-fit' : 'w-[21rem]'
            } p-4`}
          >
            <Button
              disabled={isLoading || debugging || !session || language === 'javascript' ? true : false}
              extraStyle={{
                backgroundColor: variables.colorSecondary200,
                padding: '0 2rem',
                height: isMobile ? '3rem' : '2.5rem',
                opacity: isLoading || debugging || language === 'javascript' ? '0.5' : '1',
                cursor: !isLoading && !debugging && language !== 'javascript' ? 'pointer' : 'unset'
              }}
              onClick={() =>
                handleRunCodeManually(
                  reviewCode,
                  language,
                  codeInputPython,
                  codeInputJavascript,
                  false
                )
              }
            >
              Execute
            </Button>
          </Tooltip>
        </div>
        {selectedProblem &&
        (!testTitles.includes(currentProblemTitle)) || language === 'javascript' ? (
          <div className={classes['right-button-group']}>
            {!isMobile && (
              <Tooltip
                text="Unavailable"
                direction="top"
                className="w-fit h-[3rem] px-6 py-4 left-4"
              >
                <button disabled={true} style={{ opacity: 0.4 }}>
                  <DebugIcon width={21} height={21} />
                </button>
              </Tooltip>
            )}
            <Tooltip
              text="Test Unavailable"
              direction="top"
              className="w-[13rem] h-[3rem] py-4 left-10"
            >
              <Button
                disabled={true}
                extraStyle={{
                  backgroundColor: variables.colorGray500,
                  padding: '0 2rem',
                  opacity: '0.4',
                  cursor: 'unset'
                }}
              >
                Run
              </Button>
            </Tooltip>
            <Tooltip
              text="Test Unavailable"
              direction="top"
              className="w-[13rem] h-[3rem] py-4 left-10"
            >
              <Button
                disabled={true}
                extraStyle={{
                  backgroundColor: variables.colorPrimary200,
                  padding: '0 2rem',
                  opacity: '0.4',
                  cursor: 'unset'
                }}
              >
                Submit
              </Button>
            </Tooltip>
          </div>
        ) : (
          <div className={classes['right-button-group']}>
            {!isMobile && (
              <>
                {!exitingDebugging ? (
                  <Tooltip
                    text={debugging ? 'Exit' : 'Debug'}
                    direction="top"
                    className="w-fit px-6 py-4 left-4"
                  >
                    <button onClick={handleDebugButton}>
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
                    <span className="cursor-not-allowed">
                      <LoadingInfinityIcon width={21} height={21} />
                    </span>
                  </Tooltip>
                )}
              </>
            )}
            <Button
              disabled={isLoading || debugging || !session ? true : false}
              extraStyle={{
                backgroundColor: variables.colorGray500,
                padding: '0 2rem',
                opacity: isLoading || debugging ? '0.5' : '1',
                cursor: !isLoading && !debugging ? 'pointer' : 'unset'
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
              disabled={isLoading || debugging || !session ? true : false}
              extraStyle={{
                backgroundColor: variables.colorPrimary200,
                padding: '0 2rem',
                opacity: isLoading || debugging ? '0.5' : '1',
                cursor: !isLoading && !debugging ? 'pointer' : 'unset'
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
        )}
      </div>
    </>
  );
};

export default ConsoleActionBar;
