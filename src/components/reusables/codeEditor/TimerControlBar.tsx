import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDuration } from '@/store';
import ArrowPathIcon from '@/components/icons/ArrowPathIcon';
import PlayIcon from '@/components/icons/PlayIcon';
import PauseIcon from '@/components/icons/PauseIcon';

type TimerControlBarProps = {
  mode: string;
  start: boolean;
  id: number | undefined;
  setId: Dispatch<SetStateAction<number | undefined>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  setMinutes: Dispatch<SetStateAction<number>>
};

const TimerControlBar: React.FC<TimerControlBarProps> = ({
  mode,
  start,
  id,
  setId,
  setStart,
  setMinutes
}) => {
  const { theme, duration } = useAppSelector(state => {
    const { theme } = state.theme;
    const { duration } = state.user;
    return { theme, duration };
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (start) {
      if (mode === 'timer') {
        const timeoutId = setTimeout(() => {
          if (duration! > 0) {
            dispatch(setDuration(duration! - 1));
          } else {
            handleStop();
            alert("Time's up!");
          }
        }, 1000) as unknown as number;
        setId(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          dispatch(setDuration(duration! + 1));
        }, 1000) as unknown as number;
        setId(timeoutId);
      }
    }
  }, [duration, start]);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
    clearTimeout(id);
    setId(undefined);
  };

  const handleReset = () => {
    handleStop();
    dispatch(setDuration(0));
    if (mode === 'timer') {
      setMinutes(0);
    }
  };

  const handleOnClick = () => {
    if (!start) {
      handleStart();
    } else {
      handleStop();
    }
  };

  let startButtonColor = '';
  if ((duration === 0 && mode === 'timer') || !start) {
    startButtonColor = theme === 'dark' ? 'bg-[#656565]' : 'bg-[#a7a3ae]';
  } else if (start) {
    startButtonColor = 'bg-[#e65715]';
  }

  return (
    <div className="flex space-x-6">
      <button
        className={`${startButtonColor} px-8 py-2 rounded-md ${
          (duration !== 0 && mode === 'timer') || mode === 'stopwatch' ? 'hover:bg-primary' : ''
        }`}
        onClick={handleOnClick}
        disabled={duration === 0 && mode === 'timer' ? true : false}
      >
        {!start ? (
          <span className="text-white">
            <PlayIcon width="8" height="8" />
          </span>
        ) : (
          <span className="text-white">
            <PauseIcon width="8" height="8" />
          </span>
        )}
      </button>
      <button
        className={`${
          theme === 'dark' ? 'bg-[#656565]' : 'bg-[#a7a3ae]'
        } px-8 py-2 rounded-md hover:bg-neutral`}
        onClick={handleReset}
      >
        <span className="text-white">
          <ArrowPathIcon width="7" height="7" />
        </span>
      </button>
    </div>
  );
};

export default TimerControlBar;
