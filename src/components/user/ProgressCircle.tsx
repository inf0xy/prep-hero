import { useAppSelector } from '@/hooks/hooks';
import classes from './ProgressCircle.module.scss';

type ProgressCircleProps = {
  progress: number;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const { theme } = useAppSelector(state => state.theme);
  const circleStyle = {
    strokeDashoffset: 472 - (3.7 * progress)
  };

  return (
    <div className={classes['progress-circle__container']}>
      <div className={`${classes['progress-text']} ${classes[`progress-text--${theme}`]}`}>
        <p className={`${classes.solved} ${classes[`solved--${theme}`]}`}>20</p>
        <p>Solved</p>
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
