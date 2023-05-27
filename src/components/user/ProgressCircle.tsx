import { useAppSelector } from '@/hooks/hooks';
import classes from './ProgressCircle.module.scss';

const ProgressCircle = () => {
  const { theme, total_solved } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { total_solved } = state.user;
    return {
      theme,
      total_solved
    };
  });

  const circleStyle = {
    strokeDashoffset: 472 - 3.7 * +total_solved
  };
  const { allProblemsCount } = useAppSelector((state) => state.problems);

  return (
    <div className={classes['progress-circle__container']}>
      <div
        className={`${classes['progress-text']} ${
          classes[`progress-text--${theme}`]
        }`}
      >
        <p className={`${classes.solved} ${classes[`solved--${theme}`]}`}>{total_solved.toString()}</p>
        <p className={classes['solved-current']}>Solved</p>
        <p className={classes['solved-total']}>{allProblemsCount}</p>
      </div>
      <svg className={classes['progress-circle']}>
        <circle
          className={classes['progress-circle-background']}
          cx="50%"
          cy="50%"
          r="25%"
        />
        <circle
          className={classes['progress-circle-progress']}
          cx="50%"
          cy="50%"
          r="25%"
          style={circleStyle}
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
