import { useAppSelector } from '@/hooks/hooks';
import ProgressBar from '@/components/user/ProgressBar';
import ProgressCircle from '@/components/user/ProgressCircle';
import HeatMapCalendar from '@/components/user/HeatMapCalendar';
import TitleList from '@/components/reusables/TitleList';
import BookmarkFill from '@/components/icons/BookmarkFill';
import classes from '../styles/UserDashBoard.module.scss';
import { useRef } from 'react';

const DashBoard = () => {
  const { theme, submissions, list } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions, list } = state.user;
    return { theme, submissions, list };
  });

  const parentDiv = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${classes['user-dashboard']} ${
        classes[`user-dashboard--${theme}`]
      }`}
    >
      <div className={classes.profile}>
        <h1>Profile</h1>
      </div>
      <div className={classes.overview}>
        <div className={classes.heatmap}>
          <h2>{submissions.length} submissions last year</h2>
          <div className={classes['heatmap-container']} ref={parentDiv}>
            <HeatMapCalendar parentRef={parentDiv}/>
          </div>
        </div>
        <div className={classes.progress}>
          <ProgressCircle />
          <ProgressBar />
        </div>
        <span className={classes['saved-list']}>
          <TitleList
            listType='problems'
            titles={list}
            firstIconText="Remove"
            secondIconText="Status"
            firstIcon={<BookmarkFill className='text-primary' />}
            secondIcon={<BookmarkFill className='text-primary' />}
            firstIconAction={undefined}
            secondIconAction={undefined}
            // actionBar={actionBar}
          />
        </span>
      </div>
      {/* <div className={classes.records}></div>
      <div className={classes.overview}>
        <div className={classes.vl}></div>

      </div> */}
    </div>
  );
};

export default DashBoard;
