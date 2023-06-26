import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import TitleList from '../reusables/TitleList';
import BookmarkFill from '../icons/BookmarkFill';
import { removeProblemFromList } from '@/store';
import classes from './SavedList.module.scss';

const SavedList = () => {
  const { list, theme } = useAppSelector((state) => {
    const { list } = state.user;
    const { theme } = state.theme;
    return { list, theme };
  });

  const dispatch = useAppDispatch();

  return (
    <div className="drawer">
      <div
        className={`${classes['saved-list-drawer']} ${
          classes[`saved-list-drawer--${theme}`]
        }`}
      >
        <h2 className={classes.title}>Saved List</h2>
        <TitleList
          listType="problems"
          titles={list}
          firstIconText=""
          secondIconText=""
          firstIcon={<BookmarkFill className="text-primary" />}
          secondIcon={<BookmarkFill className="text-primary" />}
          firstIconAction={undefined}
          secondIconAction={(title) => dispatch(removeProblemFromList(title!))}
        />
      </div>
    </div>
  );
};

export default SavedList;
