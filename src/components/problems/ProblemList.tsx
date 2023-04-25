import { useState } from 'react';
import { Problem } from '@/types/dataTypes';
import ProblemItem from './ProblemItem';
import classes from './ProblemList.module.css';
import SortIcon from '../icons/SortIcon';

interface ProblemListProps {
  problems: Problem[];
  onSort: (field: string) => void
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, onSort }) => {
  const renderedProblems = problems.map((problem) => (
    <ProblemItem key={problem.title} problem={problem} />
  ));

  return (
    <div role="table" className={classes['problems-table']}>
      <div className={classes['table-header']}>
        <div role="row" className={classes['solved-header']}>
          <div>Solved</div>
        </div>
        <div role="row" className={classes['category-header']}>
          <span>Category</span>
          <span className="cursor-pointer pt-[0.5px]" onClick={() => onSort('category')}>
            <SortIcon width={14} height={14} />
          </span>
        </div>
        <div role="row" className={classes['title-header']}>
          <span>Title</span>
          <span className="cursor-pointer pt-[0.5px]" onClick={() => onSort('title')}>
            <SortIcon width={14} height={14} />
          </span>
        </div>
        <div role="row" className={classes['difficulty-header']}>
          <span>Difficulty</span>
          <span className="cursor-pointer pt-[0.5px]" onClick={() => onSort('difficulty')}>
            <SortIcon width={14} height={14} />
          </span>
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
