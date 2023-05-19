import { useAppSelector } from '@/hooks/hooks';
import Button from '../Button';
import classes from './ConsoleActionBar.module.scss';
import variables from '@/styles/variables.module.scss';

import ChevronDown from '@/components/icons/ChevronDown';

type ConsoleActionBarProps = {
  handleShowConsole: () => void;
  handleSubmission: (type: 'submit' | 'test') => void;
  showConsole: boolean;
};

const ConsoleActionBar: React.FC<ConsoleActionBarProps> = ({
  showConsole,
  handleShowConsole,
  handleSubmission
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`${classes['code-actions']} ${
        classes[`code-actions--${theme}`]
      }`}
    >
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
      <div className="flex space-x-5">
        <Button
          extraStyle={{
            backgroundColor: variables.colorGray500,
            padding: '0 2rem'
          }}
          onClick={() => handleSubmission('test')}
        >
          Run
        </Button>
        <Button
          extraStyle={{
            backgroundColor: variables.colorPrimary200,
            padding: '0 2rem'
          }}
          onClick={() => handleSubmission('submit')}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ConsoleActionBar;
