import { useAppSelector } from '@/hooks/hooks';
import classes from './ProgressBar.module.scss';
import { colors } from '@/helpers/extraStyles';

type Progress = {
  difficulty: string;
  solved: number;
};

type ProgressBarProps = { progress: Progress[] };

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const { theme } = useAppSelector((state) => state.theme);

  const renderedProgress = progress.map((item) => (
    <div
      key={item.difficulty}
      className={`${classes['progress-bar']} ${
        classes[`progress-bar--${theme}`]
      }`}
    >
      <p>{item.difficulty}</p>
      <div className={classes['bar__outer']}>
        <div
          className={classes['bar__inner']}
          style={{ backgroundColor: colors[item.difficulty] }}
        ></div>
      </div>
    </div>
  ));

  return (
    <div className={classes['progress-bar__container']}>{renderedProgress}</div>
  );
};

export default ProgressBar;
