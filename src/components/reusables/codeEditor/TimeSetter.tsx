import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import classes from './TimeSetter.module.scss';

const TimeSetter = () => {
  const [mode, setMode] = useState('timer');
  const [minutes, setMinutes] = useState(0);
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`${classes['time-setter']} ${
        classes[`time-setter--${theme}`]
      }`}
    >
      <ul className={classes.tabs}>
        <li
          className={`${mode === 'timer' ? classes.active : ''} ${
            classes['timer__tab']
          }`}
          onClick={() => setMode('timer')}
        >
          Timer
        </li>
        <li
          className={`${mode === 'stopwatch' ? classes.active : ''} ${
            classes['stopwatch__tab']
          }`}
          onClick={() => setMode('stopwatch')}
        >
          Stopwatch
        </li>
      </ul>
      {mode === 'timer' ? (
        <div className={`${classes.timer} ${classes[`timer--${theme}`]}`}>
          <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinutes(e.target.value.length > 0 ? +e.target.value : 0)
            }
          />
        </div>
      ) : (
        <div className={classes.stopwatch}></div>
      )}
    </div>
  );
};

export default TimeSetter;
