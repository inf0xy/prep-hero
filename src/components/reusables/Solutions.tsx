import { useState, useRef, useEffect } from 'react';
import CopyButton from './CopyButton';
import CodeSnippet from './CodeSnippet';
import classes from './Solutions.module.scss';

type SolutionsProps = {
  videoURL: string;
  solution_codes:
    | {
        python: string;
        javascript: string;
      }
    | undefined;
};

const Solutions: React.FC<SolutionsProps> = ({ videoURL, solution_codes }) => {
  const [solutionLanguage, setSolutionLanguage] = useState('python');
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.solutions}>
      {videoURL !== '' && (
        <div className={classes.video}>
          <iframe src={videoURL} allowFullScreen></iframe>
        </div>
      )}
      <ul className={classes['language-selection']}>
        <li
          className={solutionLanguage === 'python' ? classes.active : ''}
          onClick={() => setSolutionLanguage('python')}
        >
          Python
        </li>
        <li
          className={solutionLanguage === 'javascript' ? classes.active : ''}
          onClick={() => setSolutionLanguage('javascript')}
        >
          Javascript
        </li>
      </ul>
      {solution_codes && (
        <div className={classes.codes} ref={parentRef}>
          <CopyButton
            content={
              solutionLanguage === 'python'
                ? JSON.parse(solution_codes.python)
                : JSON.parse(solution_codes.javascript)
            }
            parentRef={parentRef}
            className="top-[1rem] right-[5rem]"
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
            <div className='overflow-y-scroll'>
              {solution_codes ? (
                <CodeSnippet
                  key="javascriptSnippet"
                  value={solution_codes.javascript}
                  language="javascript"
                />
              ) : (
                <p>No solutions availabe</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Solutions;
