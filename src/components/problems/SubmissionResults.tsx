import { useAppSelector } from '@/hooks/hooks';
import { ResultMessage } from '@/types/dataTypes';
import CheckIcon from '../icons/CheckIcon';
import classes from './SubmissionResults.module.scss';
import RunResults from './RunResults';

type SubmissionResultsProps = {
  result: ResultMessage;
};

const SubmissionResults: React.FC<SubmissionResultsProps> = ({ result }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <>
      {result.passResult ? (
        <div className={`${classes['submission__message']}`}>
          <h1 className="text-green-500">
            <span>
              <CheckIcon width='27' height='27'/>
            </span>
            You passed all tests
          </h1>

          <h3
            className={`${
              result.passResult ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {result.testPassed}
          </h3>
          <p className={`${classes[`runtime--${theme}`]}`}>
            Runtime {result.runtime} ms
          </p>
        </div>
      ) : (
        <RunResults
          type='submit'
          testResults={{
            results: result.failedTestCases,
            runtime: result.runtime
          }}
          totalTestFailed={`${result.testPassed}`}
        />
      )}
    </>
  );
};

export default SubmissionResults;

// <h1 className="text-red-500">
//   <span>
//     <FailedCircleIcon width={23} height={23} />
//   </span>
//   {`${result.testFailed} ${+result.testFailed > 1 ? 'tests' : 'test'}`}{' '}
//   failed
// </h1>
