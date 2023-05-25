import { useState } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { RunResult } from '@/types/dataTypes';
import PassIcon from '../icons/PassIcon';
import FailIcon from '../icons/FailIcon';
import variables from '@/styles/variables.module.scss';
import classes from './RunResults.module.scss';

type RunResultsProps = {
  testResults: RunResult;
  type: string;
  totalTestFailed?: string;
};

const RunResults: React.FC<RunResultsProps> = ({
  type,
  testResults,
  totalTestFailed
}) => {
  const [currentTest, setCurrentTest] = useState(0);
  const { results, runtime, stdOut } = testResults;

  const { theme } = useAppSelector((state) => state.theme);

  const tabs = results.slice(0, 3).map((el, index) => (
    <div
      key={index}
      className={`${classes['tabs__item']} ${
        currentTest === index ? 'opacity-75' : 'opacity-100'
      }`}
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
  const keys = Object.keys(test).slice(0, -1);

  return (
    <div className={classes.results}>
      <div className={`${classes.header} ${classes[`header--${theme}`]}`}>
        {results.every((el) => el.result === 'passed') ? (
          <h1 className="text-[2rem] text-green-500">Passed</h1>
        ) : (
          <h1 className="text-[2rem] text-red-500">Failed</h1>
        )}
        <p className="text-[1.5rem] mt-2">Runtime {runtime} ms</p>
        {type === 'submit' && (
          <p
            className="text-[1.5rem] mt-2 text-red-500"
            style={{ color: variables.colorError300 }}
          >
            {totalTestFailed} testcases
          </p>
        )}
      </div>
      <div className="flex items-center space-x-8">{tabs}</div>
      <div
        className={`${classes['results__output']} ${
          classes[`results__output--${theme}`]
        }`}
      >
        <h3>Input:</h3>
        <code>
          {keys.map((el: any, index: number) => (
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
          <p>expected = {JSON.stringify(test.expected)}</p>
          <p
            className={`${
              results[currentTest].result === 'failed' ? 'text-red-500' : ''
            }`}
          >
            output = {JSON.stringify(output)}
          </p>
        </code>
      </div>
      {stdOut.length > 0 && (
        <div
          className={`${classes['results__output']} ${
            classes[`results__output--${theme}`]
          }`}
        >
          <h3>Stdout:</h3>
          <code>
            {stdOut.map((el) => (
              <p key={el}>{el}</p>
            ))}
          </code>
        </div>
      )}
    </div>
  );
};

export default RunResults;