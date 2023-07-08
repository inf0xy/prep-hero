import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/hooks/hooks';
import { Problem } from '@/types/dataTypes';
import ProblemItem from './ProblemItem';
import SortIcon from '../icons/SortIcon';
import classes from './ProblemList.module.scss';

interface ProblemListProps {
  problems: Problem[];
  onSort: (field: string) => void;
  showNotes?: boolean;
}

const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  onSort,
  showNotes
}) => {
  const { data: session } = useSession();
  const { theme } = useAppSelector((state) => state.theme);
  const isMobile = useMediaQuery({ query: '(max-width: 820px)' });

  const renderedProblems = problems.map((problem, index) => (
    <ProblemItem
      key={problem.title}
      problem={problem}
      showNotes={showNotes!}
      oddCell={index % 2 === 1 ? true : false}
    />
  ));

  return (
    <div
      role="table"
      // className={`${isMobile && 'no-scrollbar'} ${classes['problems-table']} ${
      //   classes[`problems-table--${theme}`]
      // }`}
      className={`${classes['problems-table']} ${
        classes[`problems-table--${theme}`]
      }`}
    >
      <div className={`${classes['table-header']} ${classes[`table-header--${theme}`]}`}>
        {!isMobile && (
          <>
            <div role="row" className={classes['solved-header']}>
              <div>
                {session?.session.user.account_type === 'admin'
                  ? 'Edit'
                  : ''}
              </div>
            </div>
            <div role="row" className={classes['category-header']}>
              <span>Category</span>
              <span
                className="cursor-pointer"
                onClick={() => onSort('category')}
              >
                <SortIcon width={14} height={14} />
              </span>
            </div>
          </>
        )}
        <div role="row" className={classes['title-header']}>
          <span>Title</span>
          <span className="cursor-pointer" onClick={() => onSort('title')}>
            <SortIcon width={14} height={14} />
          </span>
        </div>
        <div role="row" className={classes['difficulty-header']}>
          <span>Difficulty</span>
          <span
            className="cursor-pointer pt-[0.5px]"
            onClick={() => onSort('difficulty')}
          >
            <SortIcon width={14} height={14} />
          </span>
        </div>
        {isMobile && (
          <div role="row" className={classes['category-header']}>
            <span>Category</span>
            <SortIcon width={14} height={14} />
          </div>
        )}
        <div role="row" className={classes['solution-header']}>
          <div>Solution</div>
        </div>
        <div role="row" className={classes['companies-header']}>
          <div>Companies</div>
        </div>
        {isMobile && (
          <div role="row" className={classes['solved-header']}>
            <div>
              {session?.session.user.account_type === 'admin'
                ? 'Edit'
                : 'Status'}
            </div>
          </div>
        )}
      </div>
      <div role="table-body" className={classes['table-body']}>
        {renderedProblems}
      </div>
    </div>
  );
};

export default ProblemList;
