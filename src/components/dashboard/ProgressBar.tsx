import { useAppSelector } from '@/hooks/hooks';
import { colors } from '@/helpers/extraStyles';
import classes from './ProgressBar.module.scss';

const ProgressBar = () => {
  const {
    theme,
    easyProblemsCount,
    mediumProblemsCount,
    hardProblemsCount,
    easy_solved,
    medium_solved,
    hard_solved
  } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { easyProblemsCount, mediumProblemsCount, hardProblemsCount } =
      state.problems;
    const { easy_solved, medium_solved, hard_solved } = state.user;
    return {
      theme,
      easyProblemsCount,
      mediumProblemsCount,
      hardProblemsCount,
      easy_solved,
      medium_solved,
      hard_solved
    };
  });

  const progress = [
    { difficulty: 'Easy', solved: easy_solved.length },
    { difficulty: 'Medium', solved: medium_solved.length },
    { difficulty: 'Hard', solved: hard_solved.length }
  ];

  const getDifficultyCount = (difficulty: string, collection: string) => {
    if (difficulty === 'Easy') {
      return collection === 'problems' ? easyProblemsCount : easy_solved.length;
    } else if (difficulty === 'Medium') {
      return collection === 'problems'
        ? mediumProblemsCount
        : medium_solved.length;
    } else if (difficulty === 'Hard') {
      return collection === 'problems' ? hardProblemsCount : hard_solved.length;
    }
  };

  const renderedProgress = progress.map((item) => (
    <div
      key={item.difficulty}
      className={`${classes['progress-bar']} ${
        classes[`progress-bar--${theme}`]
      }`}
    >
      <div className={classes['progress-content']}>
        <p>{item.difficulty}</p>
        <p
          className={`${classes['progress-content__count']} ${
            classes[`progress-content__count--${theme}`]
          }`}
        >
          {getDifficultyCount(item.difficulty, 'user')}/
          {getDifficultyCount(item.difficulty, 'problems')}
        </p>
      </div>
      <div
        className={`${classes['bar__outer']} ${
          classes[`bar__outer--${theme}`]
        }`}
        style={{ backgroundColor: colors[item.difficulty].outer }}
      >
        <div
          className={classes['bar__inner']}
          style={{
            backgroundColor: colors[item.difficulty].inner,
            width: `${
              (13 * getDifficultyCount(item.difficulty, 'user')!) /
              getDifficultyCount(item.difficulty, 'problems')!
            }rem`
          }}
        ></div>
      </div>
    </div>
  ));

  return (
    <div className={classes['progress-bar__container']}>{renderedProgress}</div>
  );
};

export default ProgressBar;
