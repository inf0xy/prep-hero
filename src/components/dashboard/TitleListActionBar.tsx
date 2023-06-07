import { useState, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import TodoListIcon from '../icons/TodoListIcon';
import CompletedTodoIcon from '../icons/CompletedTodoIcon';
import IncompletedTodoIcon from '../icons/IncompletedTodoIcon';
import classes from './TitleListActionBar.module.scss';

type TitleListActionBarProps = {
  setTitles: Dispatch<SetStateAction<string[]>>;
};

const TitleListActionBar: React.FC<TitleListActionBarProps> = ({
  setTitles
}) => {
  const { list, submissions, easy_solved, hard_solved, medium_solved } =
    useAppSelector((state) => state.user);
  const [active, setActive] = useState('all');
  const { theme } = useAppSelector(state => state.theme);

  const getCompletedProblems = () => {
    const completed = new Set();
    submissions.forEach((el) => {
      if (list.includes(el.title) && el.accepted) {
        completed.add(el.title);
      }
    });
    return completed.size;
  };

  const handleShowAll = () => {
    setActive('all');
    setTitles(list);
  };

  const handleShowCompleted = () => {
    setActive('completed');
    let completedTitles = new Set();
    submissions.forEach((el) => {
      if (list.includes(el.title)) {
        completedTitles.add(el.title);
      }
    });
    setTitles(Array.from(completedTitles) as string[]);
  };

  const handleShowIncompleted = () => {
    setActive('incompleted');
    const incompletedTitles = list.filter(
      (title) =>
        easy_solved.every(el => el.title !== title) &&
        medium_solved.every(el => el.title !== title) &&
        hard_solved.every(el => el.title !== title)
    );
    setTitles(incompletedTitles);
  };

  return (
    <div className={classes['user--title-list__action-bar']}>
      <p className={classes.completed}>
        Completed: {getCompletedProblems()}/{list.length}
      </p>
      <ul className={`${classes.filter} ${classes[`filter--${theme}`]}`}>
        <li
          className={`${classes['show-all']} ${
            active === 'all' ? classes['show-all--active'] : ''
          }`}
          onClick={handleShowAll}
        >
          <TodoListIcon />
        </li>

        <li
          className={`${classes['show-completed']} ${
            active === 'completed' ? classes['show-completed--active'] : ''
          }`}
          onClick={handleShowCompleted}
        >
          <CompletedTodoIcon />
        </li>
        <li
          className={`${classes['show-incompleted']} ${
            active === 'incompleted' ? classes['show-incompleted--active'] : ''
          }`}
          onClick={handleShowIncompleted}
        >
          <IncompletedTodoIcon />
        </li>
      </ul>
    </div>
  );
};

export default TitleListActionBar;
