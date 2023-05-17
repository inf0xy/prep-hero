import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { getProblems } from '@/helpers/problem-api-util';
import { Problem, SearchCriteria, SearchOrForm } from '@/types/dataTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUserData } from '@/store';
import ProblemList from '@/components/problems/ProblemList';
import Pagination from '@/components/problems/Pagination';
import classes from '../styles/ProblemsPage.module.scss';
import useSort from '@/hooks/useSort';
import CircleX from '@/components/icons/CircleX';
import SelectBar from '@/components/problems/SelectBar';
import Button from '@/components/reusables/Button';
import ArrowLongLeft from '@/components/icons/ArrowLongLeft';

interface AllProblemsPageProps {
  problems: Problem[];
  count: number;
}

const ITEM_PER_PAGE = 50;

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({
  problems,
  count
}) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProblems, setTotalProblems] = useState(count);
  const [showNotes, setShowNotes] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchOrForm>({
    listName: '',
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const handleSort = useSort(problems, setCurrentProblems);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems(1, searchCriteria as SearchCriteria);
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
      const data = await getProblems(
        pageNumber,
        searchCriteria as SearchCriteria
      );
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
          [key]: ((prev as SearchCriteria)[key] as string[]).filter(
            (el) => el != value
          )
        }));
      } else if ((searchCriteria as SearchCriteria)[key].includes(value)) {
        setSearchCriteria((prev) => ({
          ...prev,
          [key]: ''
        }));
      }
    }
  };

  let renderedFilters = [];
  for (let filter in searchCriteria) {
    if (
      (searchCriteria as SearchCriteria)[filter] !== '' ||
      (searchCriteria as SearchCriteria)[filter].length
    ) {
      if (['tags', 'companies'].includes(filter)) {
        ((searchCriteria as SearchCriteria)[filter] as string[]).map((el) =>
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
            key={(searchCriteria as SearchCriteria)[filter] as string}
            className={`${classes['filter-badge']} ${
              classes[`filter-badge--${theme}`]
            }`}
          >
            <span>{(searchCriteria as SearchCriteria)[filter]}</span>
            <button
              onClick={() =>
                handleRemoveFilters(
                  (searchCriteria as SearchCriteria)[filter] as string
                )
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
        {session && session.session.user.account_type === 'admin' && (
          <Button
            color="secondary"
            className="self-start text-[1.5rem] mb-12"
            onClick={() => router.push('/admin')}
          >
            <span className="mr-3">
              <ArrowLongLeft />
            </span>
            Dashboard
          </Button>
        )}
        <div className={classes.selections}>
          <SelectBar
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            searchCriteria={searchCriteria as SearchCriteria}
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
        <div className={classes['page-number']}>
          {(pageNumber - 1) * ITEM_PER_PAGE + 1} -{' '}
          {pageNumber * ITEM_PER_PAGE > totalProblems
            ? totalProblems
            : pageNumber * ITEM_PER_PAGE}
          &nbsp;/&nbsp;{totalProblems}
        </div>
        <Pagination
          totalProblems={totalProblems}
          selectedPage={pageNumber}
          onPageSelect={setPageNumber}
          className="mt-6"
        />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { count, problems } = await getProblems(1, {
    listName: '',
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
