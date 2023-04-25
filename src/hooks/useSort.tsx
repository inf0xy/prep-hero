import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Problem } from '@/types/dataTypes';

enum SortDirection {
  Ascending = 1,
  Descending = -1,
  Unsorted = 0
}

const useSort = (
  problems: Problem[],
  setCurrentProblems: Dispatch<SetStateAction<Problem[]>>
): ((field: string) => void) => {
  const [currentSort, setCurrentSort] = useState(0);

  const handleSort = useCallback(
    (field: string) => {
      const sortCompare = (a: Problem, b: Problem) => {
        if (currentSort === SortDirection.Unsorted) {
          return a[field].localeCompare(b[field]);
        } else if (currentSort === SortDirection.Ascending) {
          return b[field].localeCompare(a[field]);
        }
      };

      const difficulties = {
        Easy: 1,
        Medium: 2,
        Hard: 3
      };

      const difficultyCompare = (a: Problem, b: Problem) => {
        const aOrder = difficulties[a.difficulty];
        const bOrder = difficulties[b.difficulty];

        if (aOrder === bOrder) {
          return 0;
        }
        if (currentSort === SortDirection.Unsorted) {
          return aOrder < bOrder ? -1 : 1;
        } else if (currentSort === SortDirection.Ascending) {
          return aOrder < bOrder ? 1 : -1;
        }
      };

      const compareFn =
        field === 'difficulty' ? difficultyCompare : sortCompare;

      if (currentSort === SortDirection.Descending) {
        setCurrentProblems(problems.slice());
        setCurrentSort(SortDirection.Unsorted);
        return;
      } else if (currentSort === SortDirection.Unsorted) {
        setCurrentSort(SortDirection.Ascending);
      } else if (currentSort === SortDirection.Ascending) {
        setCurrentSort(SortDirection.Descending);
      }
      setCurrentProblems((prev) => prev.sort(compareFn));
    },
    [currentSort, problems, setCurrentProblems]
  );

  return handleSort;
};

export default useSort;
