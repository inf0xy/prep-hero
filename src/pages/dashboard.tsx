import ProgressBar from '@/components/user/ProgressBar';
import classes from '../styles/UserDashBoard.module.css';
import ProgressCircle from '@/components/user/ProgressCircle';
import HeatMapCalendar from '@/components/user/HeatMapCalendar';
import { data } from '.';

const progress = [
  { difficulty: 'Easy', solved: 20 },
  { difficulty: 'Medium', solved: 43 },
  { difficulty: 'Hard', solved: 5 }
];

const DashBoard = () => {
  return (
    <div className={classes['user-dashboard']}>
      <div className={classes.records}></div>
      <div className={classes.overview}>
        <div className={classes.heatmap}>
          <HeatMapCalendar data={data} />
        </div>
        <div className={classes.vl}></div>
        <div className={classes.progress}>
          <ProgressCircle progress={36}/>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
