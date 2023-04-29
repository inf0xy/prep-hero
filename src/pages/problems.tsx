import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getProblems } from '@/helpers/problem-api-util';
import { Problem, SearchCriteria } from '@/types/dataTypes';
import ProblemList from '@/components/problems/ProblemList';
import classes from '../styles/ProblemsPage.module.css';
import useSort from '@/hooks/useSort';
import CircleX from '@/components/icons/CircleX';
import SelectBar from '@/components/problems/SelectBar';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchUserData } from '@/store';

interface AllProblemsPageProps {
  problems: Problem[];
}

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({ problems }) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const [showNotes, setShowNotes] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });
  const dispatch = useAppDispatch();
  const handleSort = useSort(problems, setCurrentProblems);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems(1, searchCriteria);
      setCurrentProblems(data);
    };

    try {
      fetchProblems();
    } catch (err) {
      console.error(err);
    }
  }, [searchCriteria]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(fetchUserData());
    }
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
            <div key={el} className={classes['filter-badge']}>
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
            className={classes['filter-badge']}
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
      <section className={classes['problems-page']}>
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
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const problems = await getProblems(1, {
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

  return {
    props: { problems },
    revalidate: 3600
  };
};

export default AllProblemsPage;
