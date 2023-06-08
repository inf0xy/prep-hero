import { Dispatch, SetStateAction, Fragment } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { config } from '@/helpers/config';
import classes from './Pagination.module.scss';

type PaginationProps = {
  selectedPage: number;
  totalProblems: number;
  onPageSelect: Dispatch<SetStateAction<number>>;
  className?: string;
};

const ITEMS_PER_PAGE = config.ITEMS_PER_PAGE;

const Pagination: React.FC<PaginationProps> = ({
  selectedPage,
  totalProblems,
  onPageSelect,
  className
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const totalPages = Math.ceil(totalProblems / ITEMS_PER_PAGE);

  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = [...Array(totalPages).keys()].map((i) => i + 1);
    } else if (selectedPage <= 3) {
      pages = [1, 2, '...', totalPages - 1, totalPages];
    } else if (selectedPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 1, totalPages - 2, totalPages];
    } else {
      pages = [1, '...', selectedPage, '...', totalPages];
    }

    return pages;
  };

  return (
    <div className={`btn-group ${className}`}>
      {getPages().map((p: string | number, index: number) =>
        p !== '...' ? (
          <button
            key={p}
            onClick={() => onPageSelect(p as number)}
            className={`btn btn-lg  ${
              selectedPage === p
                ? classes[`pagination__button--${theme}--selected`]
                : classes[`pagination__button--${theme}`]
            }`}
          >
            {p}
          </button>
        ) : (
          <button
            key={p}
            className={`btn btn-lg btn-disabled ${
              theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-neutral'
            }`}
          >
            ...
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
