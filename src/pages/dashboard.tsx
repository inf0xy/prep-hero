import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { removeProblemFromList, setTimerReminder } from '@/store';
import { getScrollbarStyles } from '@/helpers/extraStyles';
import ProgressBar from '@/components/dashboard/ProgressBar';
import ProgressCircle from '@/components/dashboard/ProgressCircle';
import HeatMapCalendar from '@/components/dashboard/HeatMapCalendar';
import TitleList from '@/components/reusables/TitleList';
import TitleListActionBar from '@/components/dashboard/TitleListActionBar';
import Button from '@/components/reusables/Button';
import BookmarkFill from '@/components/icons/BookmarkFill';
import SpeedChart from '@/components/dashboard/SpeedChart';
import NoteBookIcon from '@/components/icons/NoteBookIcon';
import classes from '../styles/UserDashBoard.module.scss';

import variables from '@/styles/variables.module.scss';

const DashBoard = () => {
  const { theme, submissions, list, timerReminder } = useAppSelector(
    (state) => {
      const { theme } = state.theme;
      const { submissions, list, timerReminder } = state.user;
      return { theme, submissions, list, timerReminder };
    }
  );

  const [savedList, setSavedList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const parentDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedList(list);
  }, [list]);

  return (
    <div
      className={`${classes['user-dashboard']} ${
        classes[`user-dashboard--${theme}`]
      }`}
    >
      <div
        className={`${classes['dashboard-left']} ${
          classes[`dashboard-left--${theme}`]
        }`}
      >
        <div className={`${classes.profile} ${classes[`profile--${theme}`]}`}>
          <h1>{session && session.session.user.name}</h1>
          <Image
            src="/user.png"
            alt="avatar"
            width={100}
            height={100}
            className="white"
          />
          <Button color="secondary" extraStyle={{ width: '70%', zIndex: 10 }}>
            Edit Profile
          </Button>
        </div>
        <div className={`${classes.progress} ${classes[`progress--${theme}`]}`}>
          <div className={classes['progress-cirlce-container']}>
            <ProgressCircle />
          </div>
          <div className={classes['progress-bar-container']}>
            <ProgressBar />
          </div>
        </div>
        <ul className={`${classes.utilities} ${classes[`utilities--${theme}`]}`}>
          <li className={classes['timer-reminder-switch']}>
            <h3>
              Timer reminder
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-info"
              checked={timerReminder}
              onChange={() => dispatch(setTimerReminder(!timerReminder))}
            />
          </li>
          <li className={classes.notebook}>
            <h3>
            Notebook
            </h3>
            <span><NoteBookIcon width={25} height={25}/></span>
          </li>
        </ul>
      </div>
      <div className={classes.overview}>
        <div className={`${classes.heatmap} ${classes[`heatmap--${theme}`]}`}>
          <h2>{submissions.length} submissions last year</h2>
          <div className={`heatmap-wrapper--${theme} ${classes['heatmap-container']}`} ref={parentDiv}>
            <HeatMapCalendar parentRef={parentDiv} />
          </div>
        </div>

        <div
          className={`${classes['speed-records']} ${
            classes[`speed-records--${theme}`]
          }`}
        >
          <SpeedChart />
        </div>
        <span className={classes['saved-list']}>
          <TitleList
            listType="problems"
            titles={savedList}
            firstIconText="Status"
            secondIconText="Remove"
            firstIcon={<BookmarkFill className="text-primary" />}
            secondIcon={<BookmarkFill className="text-primary" />}
            firstIconAction={undefined}
            secondIconAction={(title) =>
              dispatch(removeProblemFromList(title!))
            }
            actionBar={<TitleListActionBar setTitles={setSavedList} />}
          />
        </span>
      </div>
    </div>
  );
};

export default DashBoard;
