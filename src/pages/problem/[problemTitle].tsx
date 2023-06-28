import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setBreakpoints,
  setDebugging,
  setDuration,
  setWatchVars,
  setExitingDebugging,
  toggleSavedList
} from '@/store';
import { Problem, SocketType } from '@/types/dataTypes';
import SavedList from '@/components/problems/SavedList';
import Drawer from '@/components/reusables/Drawer';
import ProblemDetail from '@/components/problems/ProblemDetail';
import ProblemEditor from '@/components/problems/ProblemEditor';
import Debugger from '@/components/reusables/codeEditor/Debugger';
import Resizable from '@/components/reusables/Resizable';
import classes from '@/styles/ProblemDetailPage.module.scss';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const {
    theme,
    debugging,
    timer_reminder,
    timerDuration,
    duration,
    savedListOpen
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { debugging } = state.debugger;
    const { timer_reminder, timerDuration, duration } = state.user;
    const { savedListOpen } = state.navigate;
    return {
      debugging,
      theme,
      timer_reminder,
      timerDuration,
      duration,
      savedListOpen
    };
  });

  const [activeTab, setActiveTab] = useState('prompt');
  const [timerAlert, setTimerAlert] = useState(false);
  const [reviewCode, setReviewCode] = useState<
    { code: string; language: string } | undefined
  >(undefined);
  const [socketConnection, setSocketConnection] = useState<SocketType | null>(
    null
  );

  const [problemDetailWidth, setProblemDetailWidth] = useState(250);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const dispatch = useAppDispatch();

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
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prompts = selectedProblem.prompts
    ? selectedProblem.prompts
    : {
        python: '',
        javascript: ''
      };

  const timerAlertMessage = timerAlert
    ? 'Start stopwatch to record session.'
    : "Time's up!";

  return (
    <>
      <Drawer
        direction="left"
        showCloseButton={true}
        isOpen={savedListOpen}
        closeDrawer={() => dispatch(toggleSavedList())}
      >
        <SavedList />
      </Drawer>
      {selectedProblem && (
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
                <Resizable
                  axis="x"
                  resizeHandles="e"
                  width={problemDetailWidth}
                  setWidth={setProblemDetailWidth}
                  minWidth={windowWidth * 0.4}
                  maxWidth={windowWidth * 0.6}
                >
                  <div
                    className={`${classes.detail} ${
                      classes[`detail--${theme}`]
                    }`}
                  >
                    <ul
                      className={`${classes.tabs} ${classes[`tabs--${theme}`]}`}
                    >
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
                        className={`${
                          activeTab === 'solutions' ? 'bg-accent' : ''
                        } ${
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
                </Resizable>
              ) : (
                <Resizable
                  axis="x"
                  resizeHandles="e"
                  width={problemDetailWidth}
                  setWidth={setProblemDetailWidth}
                  minWidth={windowWidth * 0.4}
                  maxWidth={windowWidth * 0.6}
                >
                  <div
                    className={`${classes.debug} ${classes[`debug--${theme}`]}`}
                  >
                    <Debugger
                      socketConnection={socketConnection}
                      setSocketConnection={setSocketConnection}
                    />
                  </div>
                </Resizable>
              )}
            </>
          )}
          {windowWidth && (
            <div
              className={`${classes.working} ${classes[`working--${theme}`]}`}
              style={{
                minWidth: `${windowWidth - problemDetailWidth - 20}px`
              }}
            >
              <ProblemEditor
                prompts={prompts}
                title={selectedProblem.title!}
                listNames={selectedProblem.list_names!}
                reviewCode={reviewCode}
                setReviewCode={setReviewCode}
                socketConnection={socketConnection}
                availableWidth={windowWidth - problemDetailWidth - 20}
              />
            </div>
          )}
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

// export const getStaticPaths: GetStaticPaths = async () => {
//     const { titles } = await getAllTitles();

//     const paths = titles.map((title: string) => ({
//       params: { problemTitle: title }
//     }));

//     return {
//       paths,
//       fallback: 'blocking'
//     };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  let titles = [];
  try {
    const result = await getAllTitles();
    titles = result.titles;
  } catch (err: any) {
    console.error(err);
  } finally {
    const paths = titles.map((title: string) => ({
      params: { problemTitle: title }
    }));
    return {
      paths,
      fallback: 'blocking'
    };
  }
};

export default ProblemDetailPage;
