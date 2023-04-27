import ProgressBar from '@/components/user/ProgressBar';
import classes from '../styles/UserDashBoard.module.css';
import ProgressCircle from '@/components/user/ProgressCircle';
import ActivityCalendar from '@/components/user/ActivityCalendar';

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
          <ActivityCalendar />
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
