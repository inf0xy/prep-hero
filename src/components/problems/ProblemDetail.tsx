import { useState, useRef } from 'react';
import { Problem, Submission } from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';
import { problemDetailStyle } from '@/helpers/extraStyles';
import EditorPreview from '../reusables/EditorPreview';
import LogoList from './LogoList';
import CheckIcon from '../icons/CheckIcon';
import CopyButton from '../reusables/CopyButton';

import classes from './ProblemDetail.module.scss';
import CodeSnippet from '../reusables/CodeSnippet';

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
  const [solutionLanguage, setSolutionLanguage] = useState('python');
  const parentRef = useRef<HTMLDivElement>(null);

  const completed = submissions.some(
    (el: Submission) => el.title === title && el.accepted === true
  );

  const videoURL =
    'https://www.youtube.com/embed/' + solution_link?.split('=')[1];

  return (
    <>
      {tab === 'prompt' ? (
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
      ) : (
        <div className={classes.solutions}>
          <div className={classes.video}>
            <iframe src={videoURL} allowFullScreen></iframe>
          </div>

          <ul className={classes['language-selection']}>
            <li
              className={solutionLanguage === 'python' ? classes.active : ''}
              onClick={() => setSolutionLanguage('python')}
            >
              Python
            </li>
            <li
              className={
                solutionLanguage === 'javascript' ? classes.active : ''
              }
              onClick={() => setSolutionLanguage('javascript')}
            >
              Javascript
            </li>
          </ul>
          <div className={classes.codes} ref={parentRef}>
            <CopyButton
              content={
                solutionLanguage === 'python'
                  ? JSON.parse(solution_codes.python)
                  : JSON.parse(solution_codes.javascript)
              }
              parentRef={parentRef}
              className='top-6 right-6'
            />
            {solutionLanguage === 'python' ? (
              <>
                {solution_codes ? (
                  <CodeSnippet
                    key="pythonSnippet"
                    value={solution_codes.python}
                    language="python"
                  />
                ) : (
                  <p>No solutions availabe</p>
                )}
              </>
            ) : (
              <>
                {solution_codes ? (
                  <CodeSnippet
                    key="javascriptSnippet"
                    value={solution_codes.javascript}
                    language="javascript"
                  />
                ) : (
                  <p>No solutions availabe</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

ProblemDetail.defaultProps = defaultProps;

export default ProblemDetail;
