import { Problem } from '@/types/dataTypes';
import ProblemItem from './ProblemItem';
import classes from './ProblemList.module.css';

interface ProblemListProps {
  problems: Problem[];
}

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  const renderedProblems = problems.map((problem) => (
    <ProblemItem key={problem.title} problem={problem} />
  ));

  return (
    <div role="table" className={classes['problems-table']}>
      <div className={classes['table-header']}>
        <div role="row" className={classes['category-header']}>
          <div>Category</div>
        </div>
        <div role="row" className={classes['title-header']}>
          <div>Title</div>
        </div>
        <div role="row" className={classes['difficulty-header']}>
          <div>Difficulty</div>
        </div>
        <div role="row" className={classes['solution-header']}>
          <div>Solution</div>
        </div>
        <div role="row" className={classes['companies-header']}>
          <div>Companies</div>
        </div>
      </div>
      <div role="table-body" className={classes['table-body']}>
        {renderedProblems}
      </div>
    </div>
  );
};

export default ProblemList;
