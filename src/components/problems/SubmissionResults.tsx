import { useState } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { SubmissionResult } from '@/types/dataTypes';
import PassIcon from '../icons/PassIcon';
import FailIcon from '../icons/FailIcon';
import classes from './SubmissionResults.module.scss';

type SubmissionResultsProps = {
  testResults: SubmissionResult;
};

const SubmissionResults: React.FC<SubmissionResultsProps> = ({
  testResults
}) => {
  const [currentTest, setCurrentTest] = useState(0);
  const { results, runtime } = testResults;

  const { theme } = useAppSelector((state) => state.theme);

  const tabs = results.map((el, index) => (
    <div
      key={index}
      className={`${classes['tabs__item']} ${currentTest === index ? 'opacity-75' : 'opacity-100'}`}
      onClick={() => setCurrentTest(index)}
    >
      {el.result === 'passed' ? (
        <PassIcon width={13} height={13} />
      ) : (
        <FailIcon width={13} height={13} />
      )}
      <span>Test {index + 1}</span>
    </div>
  ));

  const { test, output } = results[currentTest];
  const keys = Object.keys(test);

  return (
    <div className={classes.results}>
      <div className={`${classes.header} ${classes[`header--${theme}`]}`}>
        {results.every((el) => el.result === 'passed') ? (
          <h1 className="text-[2rem] text-green-500">Passed</h1>
        ) : (
          <h1 className="text-[2rem] text-red-500">Failed</h1>
        )}
        <p className="text-[1.5rem] mt-2">Runtime {runtime}ms</p>
      </div>
      <div className="flex items-center space-x-8">{tabs}</div>
      <div
        className={`${classes['results__output']} ${
          classes[`results__output--${theme}`]
        }`}
      >
        <h3>Input:</h3>
        <code>
          {keys.slice(0, 2).map((el: any, index: number) => (
            <p key={index}>
              {keys[index]} = {JSON.stringify(test[el])}
            </p>
          ))}
        </code>
      </div>

      <div
        className={`${classes['results__output']} ${
          classes[`results__output--${theme}`]
        }`}
      >
        <h3>Output:</h3>
        <code>
          <p>expected = {JSON.stringify(test[keys[2]])}</p>
          <p
            className={`${
              results[currentTest].result === 'failed' ? 'text-red-500' : ''
            }`}
          >
            output = {JSON.stringify(output)}
          </p>
        </code>
      </div>
    </div>
  );
};

export default SubmissionResults;
