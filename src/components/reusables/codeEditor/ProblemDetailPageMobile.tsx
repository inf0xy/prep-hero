import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setBreakpoints,
  setDebugging,
  setDuration,
  setWatchVars,
  setExitingDebugging,
  setShowProblemCodeEditor,
  toggleFullScreen
} from '@/store';
import Debugger from './Debugger';
import ProblemDetail from '@/components/problems/ProblemDetail';
import ProblemEditor from '@/components/problems/ProblemEditor';
import { Problem, SocketType } from '@/types/dataTypes';
import classes from '@/styles/ProblemDetailPageMobile.module.scss';

interface ProblemDetailPageMobileProps {
  selectedProblem: Problem;
}

const ProblemDetailPageMobile: React.FC<ProblemDetailPageMobileProps> = ({
  selectedProblem
}) => {
  const [activeTab, setActiveTab] = useState('prompt');
  const [timerAlert, setTimerAlert] = useState(false);
  const [reviewCode, setReviewCode] = useState<
    { code: string; language: string } | undefined
  >(undefined);
  const [socketConnection, setSocketConnection] = useState<SocketType | null>(
    null
  );

  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [problemDetailWidth, setProblemDetailWidth] = useState(250);

  const dispatch = useAppDispatch();
  const {
    theme,
    debugging,
    timer_reminder,
    timerDuration,
    duration,
    showProblemCodeEditor
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { debugging } = state.debugger;
    const { timer_reminder, timerDuration, duration } = state.user;
    const { showProblemCodeEditor } = state.navigate;
    return {
      debugging,
      theme,
      timer_reminder,
      timerDuration,
      duration,
      showProblemCodeEditor
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProblemDetailWidth((window.innerWidth - 30) / 2);
      setWindowWidth(window.innerWidth);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    dispatch(setDuration(0));
    if (timer_reminder) {
      setTimerAlert(true);
    }

    window.addEventListener('resize', handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(setBreakpoints([]));
      dispatch(setWatchVars([]));
      dispatch(setDebugging(false));
      dispatch(setExitingDebugging(false));
      dispatch(setShowProblemCodeEditor(false));
      dispatch(toggleFullScreen(false));
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timerAlertMessage = timerAlert
    ? 'Start stopwatch to record session.'
    : "Time's up!";

  const prompts = selectedProblem.prompts
    ? selectedProblem.prompts
    : {
        python: '',
        javascript: ''
      };

  return (
    <div
      className={`problem-detail-page ${theme} ${
        classes['problem-detail-page']
      } ${classes[`problem-detail-page--${theme}`]}`}
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
      {windowWidth && (
        <>
          {!debugging ? (
            <div
              className={`${classes.detail} ${
                showProblemCodeEditor && classes['detail--inactive']
              } ${classes[`detail--${theme}`]}`}
            >
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
            <div
              className={`${classes.debug} ${
                !showProblemCodeEditor && classes['debug--inactive']
              } ${classes[`debug--${theme}`]}`}
            >
              <Debugger
                socketConnection={socketConnection}
                setSocketConnection={setSocketConnection}
              />
            </div>
          )}
        </>
      )}{' '}
      {windowWidth && (
        <div
          className={`${classes.working} ${
            !showProblemCodeEditor && classes['working--inactive']
          } ${classes[`working--${theme}`]}`}
          style={{
            minWidth: `${windowWidth - 20}px`
          }}
        >
          <ProblemEditor
            prompts={prompts}
            title={selectedProblem.title!}
            listNames={selectedProblem.list_names!}
            reviewCode={reviewCode}
            setReviewCode={setReviewCode}
            socketConnection={socketConnection}
            availableWidth={windowWidth - 20}
          />
        </div>
      )}
    </div>
  );
};

export default ProblemDetailPageMobile;
