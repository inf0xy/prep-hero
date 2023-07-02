import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  removeProblemFromList,
  setNavigateDestination,
  setTimerReminder
} from '@/store';
import { NotificationType, Submission } from '@/types/dataTypes';
import ProgressBar from '@/components/dashboard/ProgressBar';
import ProgressCircle from '@/components/dashboard/ProgressCircle';
import HeatMapCalendar from '@/components/dashboard/HeatMapCalendar';
import TitleList from '@/components/reusables/TitleList';
import TitleListActionBar from '@/components/dashboard/TitleListActionBar';
import Alert from '@/components/reusables/Alert';
import Button from '@/components/reusables/Button';
import BookmarkFill from '@/components/icons/BookmarkFill';
import SpeedChart from '@/components/dashboard/SpeedChart';
import NoteBookIcon from '@/components/icons/NoteBookIcon';
import ListIcon from '@/components/icons/ListIcon';
import SavedListIcon from '@/components/icons/SavedListIcon';
import classes from '../styles/UserDashBoard.module.scss';
import { useRouter } from 'next/router';

const DashBoard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const { theme, submissions, list, timer_reminder, destination } =
    useAppSelector((state) => {
      const { theme } = state.theme;
      const { submissions, list, timer_reminder } = state.user;
      const { destination } = state.navigate;
      return {
        theme,
        submissions,
        list,
        timer_reminder,
        destination
      };
    });

  const [savedList, setSavedList] = useState<string[]>([]);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [listType, setListType] = useState<'saved' | 'completed'>('saved');
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const parentDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedListSection = document.getElementById('saved-list');
      if (savedListSection && destination === 'saved-list') {
        savedListSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    return () => {
      dispatch(setNavigateDestination(undefined));
    };
  }, []);

  useEffect(() => {
    setSavedList(list);
  }, [list]);

  useEffect(() => {
    const completedTitles = new Set();
    submissions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach((el: Submission) => completedTitles.add(el.title));
    setCompletedList(Array.from(completedTitles) as string[]);
  }, [submissions]);

  const completedListActionBar = (
    <div className="flex items-end text-[1.5rem] ml-8">
      Total completed: {completedList.length}
    </div>
  );

  const handleSetTimerReminder = async () => {
    try {
      await dispatch(setTimerReminder(!timer_reminder));
    } catch (err: any) {
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={notification?.status!}
          setNotification={setNotification}
          onClose={() => setShowAlert(false)}
        >
          {notification!.message}
        </Alert>
      )}

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
          <div
            className={`${classes.progress} ${classes[`progress--${theme}`]}`}
          >
            <div className={classes['progress-cirlce-container']}>
              <ProgressCircle />
            </div>
            <div className={classes['progress-bar-container']}>
              <ProgressBar />
            </div>
          </div>
          <ul
            className={`${classes.utilities} ${classes[`utilities--${theme}`]}`}
          >
            <li
              className={classes['timer-reminder-switch']}
              onClick={handleSetTimerReminder}
            >
              <h3>Timer reminder</h3>
              <input
                type="checkbox"
                className="toggle toggle-info"
                checked={timer_reminder}
              />
            </li>
            <li
              className={classes.notebook}
              onClick={() => router.push('/notebook')}
            >
              <h3>Notebook</h3>
              <span>
                <NoteBookIcon width={25} height={25} />
              </span>
            </li>
            <li
              className={classes['completed-list']}
              onClick={() => setListType('completed')}
            >
              <h3>Completed List</h3>
              <span>
                {' '}
                <ListIcon width={25} height={25} />
              </span>
            </li>
            <li
              className={classes['saved-list']}
              onClick={() => setListType('saved')}
            >
              <h3>Saved List</h3>
              <span>
                <SavedListIcon width={25} height={25} />
              </span>
            </li>
          </ul>
        </div>
        <div className={classes.overview}>
          <div className={classes['heatmap-wrapper']}>
            <div
              className={`${classes.heatmap} ${classes[`heatmap--${theme}`]}`}
            >
              <h2>{submissions.length} submissions last year</h2>
              <div
                className={`heatmap-container--${theme} ${classes['heatmap-container']}`}
                ref={parentDiv}
              >
                <HeatMapCalendar parentRef={parentDiv} />
              </div>
            </div>
          </div>

          <div
            className={`${classes['speed-records']} ${
              classes[`speed-records--${theme}`]
            }`}
          >
            <SpeedChart />
          </div>
          <span className={classes['saved-list__titles']} id="saved-list">
            <TitleList
              listType="problems"
              titles={listType === 'saved' ? savedList : completedList}
              showTopBar={true}
              showHeader={true}
              firstIconText="Status"
              secondIconText={listType === 'saved' ? 'Remove' : undefined}
              firstIcon={<BookmarkFill className="text-primary" />}
              secondIcon={<BookmarkFill className="text-primary" />}
              firstIconAction={undefined}
              secondIconAction={
                listType === 'saved'
                  ? (title) => dispatch(removeProblemFromList(title!))
                  : undefined
              }
              actionBar={
                listType === 'saved' ? (
                  <TitleListActionBar setTitles={setSavedList} />
                ) : (
                  completedListActionBar
                )
              }
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
