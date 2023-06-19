import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDuration } from '@/store';
import { Problem, SocketType } from '@/types/dataTypes';
import ProblemDetail from '@/components/problems/ProblemDetail';
import ProblemEditor from '@/components/problems/ProblemEditor';
import Debugger from '@/components/reusables/codeEditor/Debugger';
import classes from '@/styles/ProblemDetailPage.module.scss';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const { theme, debugging, timer_reminder, timerDuration, duration } =
    useAppSelector((state) => {
      const { theme } = state.theme;
      const { debugging } = state.debugger;
      const { timer_reminder, timerDuration, duration } = state.user;
      return { debugging, theme, timer_reminder, timerDuration, duration };
    });

  const [activeTab, setActiveTab] = useState('prompt');
  const [timerAlert, setTimerAlert] = useState(false);
  const [reviewCode, setReviewCode] = useState<
    { code: string; language: string } | undefined
  >(undefined);
  const [socketConnection, setSocketConnection] = useState<SocketType | null>(null);

  // const [debugging, setDebugging] = useState(false);
  // const [socketConnection, setSocketConnection] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  // const [debuggingCode, setDebuggingCode] = useState('');
  // const [breakpoints, setBreakpoints] = useState<number[]>([]);
  // const [debuggingData, setDebuggingData] = useState<DebuggingData>({
  //   codeLine: '',
  //   callStack: [],
  //   localVariables: {},
  //   stdOut: [],
  //   watchVariables: {}
  // });
  // const [watchVars, setWatchVars] = useState<string[]>([]);
  // const [watchVariablesInput, setWatchVariablesInput] = useState('');
  // const [currentDebuggingLineNumber, setCurrentDebuggingLineNumber] = useState(0);
  // const [exitingDebugging, setExitingDebugging] = useState(false);

  const dispatch = useAppDispatch();

  // console.log('current breakpoints ', breakpoints);
  // console.log('currentDebugging LineNumber', currentDebuggingLineNumber);

  useEffect(() => {
    dispatch(setDuration(0));
    if (timer_reminder) {
      setTimerAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (breakpoints.length > 0) {
  //     setCurrentDebuggingLineNumber(breakpoints[0]);
  //   }
  // }, [breakpoints])

  const prompts = selectedProblem.prompts
    ? selectedProblem.prompts
    : {
        python: '',
        javascript: ''
      };

  const timerAlertMessage = timerAlert
    ? 'Start stopwatch to record session.'
    : "Time's up!";

  // const handleStartDebugging = () => {
  //   setDebuggingData({
  //     codeLine: '',
  //     callStack: [],
  //     localVariables: {},
  //     stdOut: [],
  //     watchVariables: {}
  //   });

  //   if (socketConnection) {
  //     const debuggingData = {
  //       code: debuggingCode,
  //       breakpoints
  //     };
  //     socketConnection.emit('startDebugging', JSON.stringify(debuggingData));
  //   }
  // };

  // const handleStopDebugging = () => {
  //   if (socketConnection) {
  //     socketConnection.emit('stopDebugging');
  //   }
  // }

  // const handleStepIn = () => {
  //   if (socketConnection) {
  //     socketConnection.emit('stepIn', JSON.stringify({ watchVars }));
  //   }
  // };

  // const handleStepOver = () => {
  //   if (socketConnection) {
  //     socketConnection.emit('stepOver', JSON.stringify({ watchVars }));
  //   }
  // };

  // const handleStepOut = () => {
  //   if (socketConnection) {
  //     socketConnection.emit('stepOut', JSON.stringify({ watchVars }));
  //   }
  // };

  // const handleRestart = () => {
  //   if (socketConnection) {
  //     socketConnection.emit('restart', JSON.stringify({ watchVars }));
  //   }
  // };

  // const handleExit = () => {
  //   if (socketConnection) {
  //     setExitingDebugging(true);
  //     socketConnection.emit('exit');
  //   }
  // };

  // const handleAddWatchVariables = () => {
  //   if (socketConnection) {
  //     socketConnection.emit(
  //       'addWatchVariables',
  //       JSON.stringify({ watchVars: [...watchVars, watchVariablesInput] })
  //     );
  //     setWatchVars((prev) => [...prev, watchVariablesInput]);
  //   }
  //   setWatchVariablesInput('');
  // };

  // const handleRemoveWatchVariables = (variable: string) => {
  //   const currentWatchVariables = watchVars.filter((el) => el !== variable);
  //   if (socketConnection) {
  //     socketConnection.emit(
  //       'removeWatchVariables',
  //       JSON.stringify({ watchVars: currentWatchVariables })
  //     );
  //     setWatchVars(currentWatchVariables);
  //   }
  // };

  return (
    <>
      {selectedProblem && (
        <div
          className={`${classes['problem-detail-page']} ${
            classes[`problem-detail-page--${theme}`]
          }`}
        >
          {(timerAlert || (timerDuration! > 0 && duration! === 0)) && (
            <div
              className={`${classes['timer-alert']} ${
                timerAlert ? 'bg-[#008aa9]' : 'bg-[#c59a01]'
              }`}
            >
              <p>{timerAlertMessage}</p>
              <button
                className="btn btn-sm btn-circle hover:bg-base-content hover:border-base-content"
                onClick={() => setTimerAlert(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {!debugging ? (
            <div className={`${classes.detail} ${classes[`detail--${theme}`]}`}>
              <ul className={`${classes.tabs} ${classes[`tabs--${theme}`]}`}>
                <li
                  className={`rounded-tl-md ${
                    activeTab === 'prompt' ? 'bg-accent' : ''
                  } ${
                    activeTab === 'prompt' && theme == 'light'
                      ? 'text-white'
                      : ''
                  }`}
                  onClick={() => setActiveTab('prompt')}
                >
                  Prompt
                </li>
                <li
                  className={`${activeTab === 'solutions' ? 'bg-accent' : ''} ${
                    activeTab === 'solutions' && theme == 'light'
                      ? 'text-white'
                      : ''
                  }`}
                  onClick={() => setActiveTab('solutions')}
                >
                  Solutions
                </li>
                <li
                  className={`${
                    activeTab === 'submissions' ? 'bg-accent' : ''
                  } ${
                    activeTab === 'submissions' && theme == 'light'
                      ? 'text-white'
                      : ''
                  }`}
                  onClick={() => setActiveTab('submissions')}
                >
                  Submissions
                </li>
              </ul>
              <div
                className={`problem-description-wrapper--${theme} ${classes.description}`}
              >
                <ProblemDetail
                  tab={activeTab}
                  problem={selectedProblem}
                  setReviewCode={setReviewCode}
                />
              </div>
            </div>
          ) : (
            <div className={`${classes.debug} ${classes[`debug--${theme}`]}`}>
              <Debugger setSocketConnection={setSocketConnection}/>
            </div>
          )}
          <div className={`${classes.working} ${classes[`working--${theme}`]}`}>
            <ProblemEditor
              prompts={prompts}
              title={selectedProblem.title!}
              listNames={selectedProblem.list_names!}
              reviewCode={reviewCode}
              setReviewCode={setReviewCode}
              socketConnection={socketConnection}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const problemTitle = context.params!.problemTitle as string;
  const selectedProblem = await getSelectedProblem(problemTitle);
  return {
    props: {
      selectedProblem
    },
    revalidate: 30
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { titles } = await getAllTitles();

  const paths = titles.map((title: string) => ({
    params: { problemTitle: title }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export default ProblemDetailPage;
