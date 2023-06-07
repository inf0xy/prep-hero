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
  const { results, runtime } = testResults;

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

  const { test, output, stdOut } = results[currentTest];

  // Get all test input keys except expected output
  const keys = Object.keys(test).slice(0, -1);

  const expectedOutput = JSON.stringify(test.expected)
    .replace(/"None"/g, JSON.stringify(null))
    .replace(/"True"/g, JSON.stringify(true))
    .replace(/"False"/g, JSON.stringify(false));

  const printOutput = stdOut
    .replace(/"None"/g, JSON.stringify(null))
    .replace(/"True"/g, JSON.stringify(true))
    .replace(/"False"/g, JSON.stringify(false));

  const getFailedMessage = (resultText: string) => {
    let res = '';
    if (resultText.includes('timeout')) {
      res = 'Time Limit Exceeded';
    } else {
      res = 'Failed';
    }
    return res;
  };

  return (
    <div className={classes.results}>
      <div className={`${classes.header} ${classes[`header--${theme}`]}`}>
        {results[currentTest].result === 'passed' ? (
          <h1 className="text-[2rem] text-green-500">Passed</h1>
        ) : (
          <h1 className="text-[2rem] text-red-500">
            {getFailedMessage(results[currentTest].result)}
          </h1>
        )}
        {results[currentTest].result === 'passed' && (
          <p className="text-[1.5rem] mt-2">Runtime {runtime} ms</p>
        )}
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
              {keys[index]} ={' '}
              {JSON.stringify(test[el])
                .replace(/"None"/g, JSON.stringify(null))
                .replace(/"True"/g, JSON.stringify(true))
                .replace(/"False"/g, JSON.stringify(false))}
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
          <p>expected = {expectedOutput}</p>
          {output !== null && output !== undefined && (
            <p
              className={`${
                results[currentTest].result === 'failed' ? 'text-red-500' : ''
              }`}
            >
              output ={' '}
              {JSON.stringify(output).replace(/"None"/g, JSON.stringify(null))}
            </p>
          )}
        </code>
      </div>

      {printOutput.length > 0 && (
        <div
          className={`${classes['results__output']} ${
            classes[`results__output--${theme}`]
          }`}
        >
          <h3>Stdout:</h3>
          <code>
            {printOutput.split('\n').map((el, index) => (
              <p key={`${el}${index}`}>{el}</p>
            ))}
          </code>
        </div>
      )}
    </div>
  );
};

export default RunResults;
