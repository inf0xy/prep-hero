import { useAppSelector } from '@/hooks/hooks';
import ProgressBar from '@/components/user/ProgressBar';
import ProgressCircle from '@/components/user/ProgressCircle';
import HeatMapCalendar from '@/components/user/HeatMapCalendar';
import classes from '../styles/UserDashBoard.module.scss';

const DashBoard = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`${classes['user-dashboard']} ${
        classes[`user-dashboard--${theme}`]
      }`}
    >
      <div className={classes.records}></div>
      <div className={classes.overview}>
        <div className={classes.heatmap}>
          <HeatMapCalendar />
        </div>
        <div className={classes.vl}></div>
        <div className={classes.progress}>
          <ProgressCircle />
          <ProgressBar />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
