import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getProblems } from '@/helpers/problem-api-util';
import { Problem, SearchCriteria } from '@/types/dataTypes';
import ProblemList from '@/components/problems/ProblemList';
import Pagination from '@/components/problems/Pagination';
import classes from '../styles/ProblemsPage.module.scss';
import useSort from '@/hooks/useSort';
import CircleX from '@/components/icons/CircleX';
import SelectBar from '@/components/problems/SelectBar';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUserData } from '@/store';

interface AllProblemsPageProps {
  problems: Problem[];
  count: number
}

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({ problems, count }) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProblems, setTotalProblems] = useState(count);
  const [showNotes, setShowNotes] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const handleSort = useSort(problems, setCurrentProblems);
// console.log(count, currentProblems)
  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems(1, searchCriteria);
      setCurrentProblems(data.problems);
      setTotalProblems(data.count);
    };

    try {
      setPageNumber(1);
      fetchProblems();
    } catch (err) {
      console.error(err);
    }
  }, [searchCriteria]);

  useEffect(() => {
    const fetchPageProblems = async () => {
      const data = await getProblems(pageNumber, searchCriteria);
      setCurrentProblems(data.problems);
    };
    try {
      fetchPageProblems();
    } catch (err) {
      console.error(err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(fetchUserData());
    };
    try {
      fetchUserInfo();
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const handleRemoveFilters = (value: string) => {
    for (let key in searchCriteria) {
      if (key == 'tags' || key == 'companies') {
        setSearchCriteria((prev) => ({
          ...prev,
          [key]: (prev[key] as string[]).filter((el) => el != value)
        }));
      } else if (searchCriteria[key].includes(value)) {
        setSearchCriteria((prev) => ({
          ...prev,
          [key]: ''
        }));
      }
    }
  };

  let renderedFilters = [];
  for (let filter in searchCriteria) {
    if (searchCriteria[filter] !== '' || searchCriteria[filter].length) {
      if (['tags', 'companies'].includes(filter)) {
        (searchCriteria[filter] as string[]).map((el) =>
          renderedFilters.push(
            <div
              key={el}
              className={`${classes['filter-badge']} ${
                classes[`filter-badge--${theme}`]
              }`}
            >
              <span>{el}</span>
              <button onClick={() => handleRemoveFilters(el)}>
                <CircleX />
              </button>
            </div>
          )
        );
      } else {
        renderedFilters.push(
          <div
            key={searchCriteria[filter] as string}
            className={`${classes['filter-badge']} ${
              classes[`filter-badge--${theme}`]
            }`}
          >
            <span>{searchCriteria[filter]}</span>
            <button
              onClick={() =>
                handleRemoveFilters(searchCriteria[filter] as string)
              }
            >
              <CircleX />
            </button>
          </div>
        );
      }
    }
  }

  return (
    <>
      <section
        className={`${classes['problems']} ${classes[`problems--${theme}`]}`}
      >
        <div className={classes.selections}>
          <SelectBar
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
          />
        </div>
        <div className={classes.filters}>{renderedFilters}</div>
        {currentProblems && (
          <ProblemList
            onSort={handleSort}
            problems={currentProblems}
            showNotes={showNotes}
          />
        )}
        <Pagination totalProblems={totalProblems} selectedPage={pageNumber} onPageSelect={setPageNumber} className='mt-16'/>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { count, problems } = await getProblems(1, {
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

  return {
    props: { problems, count },
    revalidate: 3600
  };
};

export default AllProblemsPage;
