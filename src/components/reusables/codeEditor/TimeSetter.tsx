import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDuration } from '@/store';
import TimerControlBar from './TimerControlBar';
import classes from './TimeSetter.module.scss';
import ConfirmPanel from '../ConfirmPanel';

const TimeSetter = () => {
  const [mode, setMode] = useState('timer');
  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const { theme, duration } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { duration } = state.user;
    return { theme, duration };
  });

  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value.length > 0 ? +e.target.value : 0);
    dispatch(setDuration(e.target.value.length > 0 ? +e.target.value * 60 : 0));
  };

  const handleSwappingTab = () => {
    clearTimeout(id);
    setId(undefined);
    setStart(false);
    dispatch(setDuration(0));
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
                  dispatch(setDuration(0));
                  setMinutes(0);
                  dispatch(setDuration(0));
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
                  dispatch(setDuration(0));
                  setMinutes(0);
                  dispatch(setDuration(0));
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
              id={id}
              setId={setId}
              setStart={setStart}
              setMinutes={setMinutes}
            />
          </div>
        </div>
      ) : (
        <div className={classes.stopwatch}>
          <TimerControlBar
            mode={mode}
            start={start}
            id={id}
            setId={setId}
            setStart={setStart}
            setMinutes={setMinutes}
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
