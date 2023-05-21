import { useState, useRef, Suspense } from 'react';
import CopyButton from './CopyButton';
import CodeSnippet from './CodeSnippet';
import classes from './Solutions.module.scss';
import Loading from './Loading';

type SolutionsProps = {
  videoURL: string;
  solution_codes: {
    python: string;
    javascript: string;
  };
};

const Solutions: React.FC<SolutionsProps> = ({ videoURL, solution_codes }) => {
  const [solutionLanguage, setSolutionLanguage] = useState('python');
  const parentRef = useRef<HTMLDivElement>(null);
console.log(videoURL);
  return (
    <div className={classes.solutions}>
      {videoURL !== '' && (
        <Suspense fallback={<Loading width={35} height={35} />}>
          <div className={classes.video}>
            <iframe src={videoURL} allowFullScreen></iframe>
          </div>
        </Suspense>
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
      )}
    </div>
  );
};

export default Solutions;
