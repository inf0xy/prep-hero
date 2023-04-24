import { GetStaticProps } from 'next';
import { getAllProblems } from '@/helpers/problem-api-util';
import { useState, useEffect, ReactElement } from 'react';
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

interface AllProblemsPageProps {
  problems: Problem[];
}

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({ problems }) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

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
console.log(searchCriteria)
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
    <section className={classes['problems-page']}>
      <div className={classes.selections}>
        <CategoryList setCategory={setSearchCriteria} />
        <DifficultyList setDifficulty={setSearchCriteria} />
        <TagList setTags={setSearchCriteria} />
        <CompanyList setCompany={setSearchCriteria} />
        <SearchBar setSearchTerm={setSearchCriteria} defaultText='Search'/>
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
      </div>
      <div className={classes.filters}>{renderedFilters}</div>
      <ProblemList problems={problems} />
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const problems = await getAllProblems(1);
  return {
    props: { problems },
    revalidate: 3600
  };
};

export default AllProblemsPage;
