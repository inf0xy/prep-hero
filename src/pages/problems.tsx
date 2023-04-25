import { useState, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';
import { getProblems } from '@/helpers/problem-api-util';
import ProblemList from '@/components/problems/ProblemList';
import { Problem, SearchCriteria } from '@/types/dataTypes';
import classes from '../styles/ProblemsPage.module.css';

import CategoryList from '@/components/problems/CategoryList';
import DifficultyList from '@/components/problems/DifficultyList';
import TagList from '@/components/problems/TagList';
import CompanyList from '@/components/problems/CompanyList';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ShuffleIcon from '@/components/icons/ShuffleIcon';
import CircleX from '@/components/icons/CircleX';
import ResetIcon from '@/components/icons/ResetIcon';

interface AllProblemsPageProps {
  problems: Problem[];
}

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({ problems }) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

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

  const handleSearchReset = () => {
    setSearchCriteria({
      category: '',
      difficulty: '',
      tags: [],
      companies: [],
      text: ''
    });
  };

  return (
    <section className={classes['problems-page']}>
      <div className={classes.selections}>
        <CategoryList
          searchCriteria={searchCriteria}
          setCategory={setSearchCriteria}
        />
        <DifficultyList setDifficulty={setSearchCriteria} />
        <TagList searchCriteria={searchCriteria} setTags={setSearchCriteria} />
        <CompanyList
          searchCriteria={searchCriteria}
          setCompany={setSearchCriteria}
        />
        <SearchBar
          setSearchTerm={setSearchCriteria}
          defaultText="Search"
          currentSearch={searchCriteria.text}
        />
        <div className={classes.random} data-tooltip="Pick random question">
          <Button
            extraStyle={{
              borderRadius: '8px',
              height: '3rem',
              width: '5rem',
              padding: '0'
            }}
            color="secondary-200"
          >
            <ShuffleIcon width={20} height={20} />
          </Button>
        </div>
        <div
          className={classes.reset}
          data-tooltip="Pick random question"
          onClick={handleSearchReset}
        >
          <Button
            extraStyle={{
              borderRadius: '8px',
              height: '3rem',
              width: '4rem',
              padding: '0'
            }}
            color="primary-200"
          >
            <ResetIcon width={15} height={15} />
          </Button>
        </div>
      </div>
      <div className={classes.filters}>{renderedFilters}</div>
      {currentProblems && <ProblemList problems={currentProblems} />}
    </section>
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
