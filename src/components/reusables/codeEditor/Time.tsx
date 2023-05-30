import { useAppSelector } from '@/hooks/hooks';
import classes from './Time.module.scss';

const Time = () => {
  const { theme } = useAppSelector(state => state.theme);
  return <div className={`${classes.time} ${classes[`time-${theme}`]}`}>
    <p className={classes.hour}>00</p>
    <p>:</p>
    <p className={classes.minute}>00</p>
    <p>:</p>
    <p className={classes.second}>00</p>
  </div>
};

export default Time;