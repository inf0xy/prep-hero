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
  const { easyProblemsCount, mediumProblemsCount, hardProblemsCount } =
    useAppSelector((state) => state.problems);

  const getDifficultyProblemCount = (difficulty: string) => {
    if (difficulty === 'Easy') {
      return easyProblemsCount;
    } else if (difficulty === 'Medium') {
      return mediumProblemsCount;
    } else if (difficulty === 'Hard') {
      return hardProblemsCount;
    }
  };

  const renderedProgress = progress.map((item) => (
    <div
      key={item.difficulty}
      className={`${classes['progress-bar']} ${
        classes[`progress-bar--${theme}`]
      }`}
    >
      <div className={classes['progress-content']}>
        <p>{item.difficulty}</p>
        <p className={classes['progress-content__count']}>
          5/{getDifficultyProblemCount(item.difficulty)}
        </p>
      </div>
      <div className={classes['bar__outer']}>
        <div
          className={classes['bar__inner']}
          style={{
            backgroundColor: colors[item.difficulty],
            width: `${13 * 5 / getDifficultyProblemCount(item.difficulty)!}rem`
          }}
        ></div>
      </div>
    </div>
  ));

  return (
    <div className={classes['progress-bar__container']}>{renderedProgress}</div>
  );
};

export default ProgressBar;
