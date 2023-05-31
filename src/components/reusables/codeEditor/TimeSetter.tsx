import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';
import { useAppSelector } from '@/hooks/hooks';
import TimerControlBar from './TimerControlBar';
import classes from './TimeSetter.module.scss';
import ConfirmPanel from '../ConfirmPanel';

type TimeSetterProps = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
};

const TimeSetter: React.FC<TimeSetterProps> = ({ time, setTime }) => {
  const [mode, setMode] = useState('timer');
  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const { theme } = useAppSelector((state) => state.theme);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value.length > 0 ? +e.target.value : 0);
    setTime(e.target.value.length > 0 ? +e.target.value * 60 : 0);
  };

  const handleSwappingTab = () => {
    clearTimeout(id);
    setId(undefined);
    setStart(false);
    setTime(0);
    setMinutes(0);
    setMode(mode === 'timer' ? 'stopwatch' : 'timer');
  };

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
          onClick={
            !start
              ? () => {
                  setMode('timer');
                  setTime(0);
                  setMinutes(0);
                }
              : () => {}
          }
        >
          {start ? (
            <label
              htmlFor="timer-tab-swapping-confirm"
              className="cursor-pointer"
            >
              Timer
            </label>
          ) : (
            <span>Timer</span>
          )}
        </li>
        <li
          className={`${mode === 'stopwatch' ? classes.active : ''} ${
            classes['stopwatch__tab']
          }`}
          onClick={
            !start
              ? () => {
                  setMode('stopwatch');
                  setTime(0);
                  setMinutes(0);
                }
              : () => {}
          }
        >
          {start ? (
            <label
              htmlFor="timer-tab-swapping-confirm"
              className="cursor-pointer"
            >
              Stopwatch
            </label>
          ) : (
            <span>Stopwatch</span>
          )}
        </li>
      </ul>
      {mode === 'timer' ? (
        <div className={`${classes.timer} ${classes[`timer--${theme}`]}`}>
          <label>Minutes</label>
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={handleOnChange}
            disabled={start ? true : false}
            className={start ? classes.inactive : ''}
          />
          <div className={classes['control-bar']}>
            <TimerControlBar
              mode={mode}
              start={start}
              time={time}
              id={id}
              setId={setId}
              setStart={setStart}
              setMinutes={setMinutes}
              setTime={setTime}
            />
          </div>
        </div>
      ) : (
        <div className={classes.stopwatch}>
          <TimerControlBar
            mode={mode}
            start={start}
            time={time}
            id={id}
            setId={setId}
            setStart={setStart}
            setMinutes={setMinutes}
            setTime={setTime}
          />
        </div>
      )}
      <ConfirmPanel
        id={'timer-tab-swapping-confirm'}
        onConfirm={handleSwappingTab}
        cancelText="Cancel"
        confirmText="Reset"
        headerText={`${mode === 'timer' ? 'Timer' : 'Stopwatch'} is active!`}
        message={`The current ${
          mode === 'timer' ? 'timer' : 'stopwatch'
        } will be reset. Do you want to proceed?`}
      />
    </div>
  );
};

export default TimeSetter;
