import { useAppSelector } from '@/hooks/hooks';
import Button from '../Button';
import classes from './ConsoleActionBar.module.scss';
import variables from '@/styles/variables.module.scss';

import ChevronDown from '@/components/icons/ChevronDown';
import Tooltip from '../Tooltip';

type ConsoleActionBarProps = {
  showConsole: boolean;
  reviewCode: { code: string; language: string } | undefined;
  language: string;
  codeInputPython: string | undefined;
  codeInputJavascript: string | undefined;
  handleShowConsole: () => void;
  handleRunCodeManually: (
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined
  ) => Promise<void>;
  handleSubmission: (
    action: 'test' | 'submit',
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined,
    duration?: number,
    timer?: number
  ) => Promise<void>;
};

const ConsoleActionBar: React.FC<ConsoleActionBarProps> = ({
  showConsole,
  reviewCode,
  language,
  codeInputPython,
  codeInputJavascript,
  handleShowConsole,
  handleSubmission,
  handleRunCodeManually
}) => {
  const { theme, duration, timerDuration } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { duration, timerDuration } = state.user;
    return { theme, duration, timerDuration };
  });

  return (
    <div
      className={`${classes['code-actions']} ${
        classes[`code-actions--${theme}`]
      }`}
    >
      <div className={classes['left-button-group']}>
        <Button
          extraStyle={{
            padding: '0 1rem',
            backgroundColor: variables.colorGray700
          }}
          onClick={handleShowConsole}
        >
          Console
          <span className="ml-3">
            <ChevronDown
              className={`${showConsole ? classes.down : classes.up}`}
            />
          </span>
        </Button>

        <Tooltip
          text="Stdout"
          direction="top"
          className="left-[4.5rem] w-fit p-4"
        >
          <Button
            extraStyle={{
              backgroundColor: variables.colorSecondary200,
              padding: '0 2rem',
              height: '2.5rem'
            }}
            onClick={() =>
              handleRunCodeManually(
                reviewCode,
                language,
                codeInputPython,
                codeInputJavascript
              )
            }
          >
            Execute
          </Button>
        </Tooltip>
      </div>
      <div className="flex space-x-5">
        <Button
          extraStyle={{
            backgroundColor: variables.colorGray500,
            padding: '0 2rem'
          }}
          onClick={() =>
            handleSubmission(
              'test',
              reviewCode,
              language,
              codeInputPython,
              codeInputJavascript
            )
          }
        >
          Run
        </Button>
        <Button
          extraStyle={{
            backgroundColor: variables.colorPrimary200,
            padding: '0 2rem'
          }}
          onClick={() =>
            handleSubmission(
              'submit',
              reviewCode,
              language,
              codeInputPython,
              codeInputJavascript,
              duration,
              timerDuration
            )
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ConsoleActionBar;
