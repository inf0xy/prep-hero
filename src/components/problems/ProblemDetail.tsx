import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import {
  Problem,
  Submission,
  AttemptedProblem
} from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';
import { problemDetailStyle } from '@/helpers/extraStyles';
import EditorPreview from '../reusables/EditorPreview';
import Solutions from '../reusables/Solutions';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import SubmissionSelection from './SubmissionSelection';
import LogoList from './LogoList';
import CheckIcon from '../icons/CheckIcon';
import InProgressIcon from '../icons/InProgressIcon';

import classes from './ProblemDetail.module.scss';


type ProblemDetailProps = {
  problem: Problem;
  tab: string;
  setReviewCode: Dispatch<
    SetStateAction<{ code: string; language: string } | undefined>
  >;
};

const defaultProps = { tab: 'prompt' };

const ProblemDetail: React.FC<ProblemDetailProps> = ({
  tab,
  problem,
  setReviewCode
}) => {
  const {
    title,
    difficulty,
    companies,
    description,
    solution_link,
    solution_codes
  } = problem;

  const { theme, submissions, attempted_problems } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions, attempted_problems } = state.user;
    return { theme, submissions, attempted_problems };
  });

  const currentProblemSubmissions = submissions.filter(
    (s) => s.title === title
  );

  const [submissionStatus, setSubmissionStatus] = useState<
    'all' | 'passed' | 'failed' | string
  >('all');
  const [submissionLanguage, setSubmissionLanguage] = useState<
    'all' | 'python' | 'javascript' | string
  >('all');
  const [userSubmissions, setUserSubmissions] = useState(
    currentProblemSubmissions
  );

  useEffect(() => {
    if (submissionLanguage === 'all' && submissionStatus === 'all') {
      setUserSubmissions(currentProblemSubmissions);
    } else {
      const filteredSubmissions = currentProblemSubmissions
        .slice()
        .filter((el: Submission) => {
          let filter = false;
          const status = el.accepted ? 'passed' : 'failed';
          if (submissionLanguage === 'all') {
            filter = status === submissionStatus;
          } else if (submissionStatus === 'all') {
            filter = submissionLanguage === el.language;
          } else {
            filter =
              status === submissionStatus && el.language === submissionLanguage;
          }
          return filter;
        });
      setUserSubmissions(filteredSubmissions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionStatus, submissionLanguage, submissions]);

  const completed = submissions.some(
    (el: Submission) => el.title === title && el.accepted === true
  );

  const attemped = attempted_problems.some(
    (el: AttemptedProblem) => el.title === title
  );

  const videoURL =
    solution_link !== ''
      ? 'https://www.youtube.com/embed/' + solution_link?.split('=')[1]
      : '';

  const handleReviewCode = (language: string, code: string) => {
    setReviewCode({ language, code: JSON.parse(code) });
  };

  const renderedSubmissionList = userSubmissions
    .slice()
    .sort(
      (a: Submission, b: Submission) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .map((el: Submission, index: number) => {
      const timePassed =
        (new Date().getTime() - new Date(el.date).getTime()) / 1000;
      return (
        <div
          key={index}
          className={`${classes.submission} ${classes[`submission--${theme}`]}`}
          onClick={() => handleReviewCode(el.language, el.code)}
        >
          <h1 className={el.accepted ? classes.passed : classes.failed}>
            {el.accepted ? 'Passed' : 'Wrong Answer'}
          </h1>
          <span
            className={`${classes['submission-language']} ${
              classes[el.language]
            }`}
          >
            {el.language[0].toUpperCase() + el.language.slice(1)}
          </span>
          {timePassed > 3600 * 24 ? (
            <p className={`${classes.date} ${classes[`date--${theme}`]}`}>
              {new Date(el.date).toDateString().slice(4)}
            </p>
          ) : (
            <>
              {new Date().getTime() - new Date(el.date).getTime() <
              60 * 1000 ? (
                <p className={`${classes.date} ${classes[`date--${theme}`]}`}>
                  less than 1 min ago
                </p>
              ) : (
                <span
                  className={`${classes.date} ${classes[`date--${theme}`]}`}
                >
                  <TimeAgo date={new Date(el.date)} />
                </span>
              )}
            </>
          )}
        </div>
      );
    });

  return (
    <>
      {tab === 'prompt' && (
        <div className={classes['problem-detail']}>
          <h1>{title}</h1>
          <div className={classes['general-info']}>
            <span className={classes[`${difficulty?.toLowerCase()}`]}>
              {difficulty}
            </span>
            {completed && (
              <span className="absolute left-[8rem] top-[-0.4rem]">
                <CheckIcon width="20" height="20" />
              </span>
            )}
            {attemped && (
              <span className="absolute left-[8rem] top-[-0.5rem]">
                <InProgressIcon width={20} height={20} />
              </span>
            )}
          </div>
          <div className={classes.companies}>
            <LogoList companyNames={companies!} />
          </div>
          <EditorPreview
            value={JSON.parse(description!)}
            extraStyle={problemDetailStyle[theme]}
          />
        </div>
      )}

      {tab === 'solutions' && (
        <Solutions videoURL={videoURL} solution_codes={solution_codes!} />
      )}

      {tab === 'submissions' && (
        <div className={classes.submissions}>
          <div className={classes.selections}>
            <LanguageSelection
              multiOptions={true}
              setLanguage={setSubmissionLanguage}
              width="12rem"
              className="text-[1.4rem]"
            />
            <SubmissionSelection
              setSubmissionStatus={setSubmissionStatus}
              width="12rem"
              className="text-[1.4rem]"
            />
          </div>
          <div className={classes['submissions__content']}>
            {renderedSubmissionList}
          </div>
        </div>
      )}
    </>
  );
};

ProblemDetail.defaultProps = defaultProps;

export default ProblemDetail;
