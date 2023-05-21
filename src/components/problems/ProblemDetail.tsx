import { useEffect, useState } from 'react';
import { Problem, Submission, Option } from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';
import { problemDetailStyle } from '@/helpers/extraStyles';
import EditorPreview from '../reusables/EditorPreview';
import Solutions from '../reusables/Solutions';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import LogoList from './LogoList';
import CheckIcon from '../icons/CheckIcon';

import classes from './ProblemDetail.module.scss';
import SubmissionSelection from './SubmissionSelection';

import TimeAgo from 'react-timeago';

type ProblemDetailProps = {
  problem: Problem;
  tab: string;
};

const defaultProps = { tab: 'prompt' };

const ProblemDetail: React.FC<ProblemDetailProps> = ({ tab, problem }) => {
  const {
    title,
    difficulty,
    category,
    companies,
    description,
    solution_link,
    solution_codes
  } = problem;

  const { theme, submissions } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions } = state.user;
    return { theme, submissions };
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    'all' | 'passed' | 'failed' | string
  >('all');
  const [submissionLanguage, setSubmissionLanguage] = useState<
    'all' | 'python' | 'javascript' | string
  >('all');
  const [userSubmissions, setUserSubmissions] = useState(submissions);

  useEffect(() => {
    if (submissionLanguage === 'all' && submissionStatus === 'all') {
      setUserSubmissions(submissions);
    } else {
      const filteredSubmissions = submissions
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

  const videoURL =
    solution_link !== ''
      ? 'https://www.youtube.com/embed/' + solution_link?.split('=')[1]
      : '';

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
        <div key={index} className={classes.submission}>
          <h1 className={el.accepted ? classes.passed : classes.failed}>
            {el.accepted ? 'Passed' : 'Failed'}
          </h1>
          <span
            className={`${classes['submission-language']} ${
              classes[el.language]
            }`}
          >
            {el.language[0].toUpperCase() + el.language.slice(1)}
          </span>
          {timePassed > 3600 * 24 ? (
            <p>{new Date(el.date).toDateString().slice(4)}</p>
          ) : (
            <>
              {new Date().getTime() - new Date(el.date).getTime() <
              60 * 1000 ? (
                <p>less than 1 min ago</p>
              ) : (
                <TimeAgo date={new Date(el.date)} />
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
            <span className={classes.category}>{category}</span>
            {completed && (
              <span className="absolute left-[20rem] top-[-0.4rem]">
                <CheckIcon width="20" height="20" />
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
        <Solutions videoURL={videoURL} solution_codes={solution_codes} />
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
