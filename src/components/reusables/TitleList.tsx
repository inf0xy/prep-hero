import { ReactNode, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ResetIcon from '@/components/icons/ResetIcon';
import EditIcon from '@/components/icons/EditIcon';
import BreakerIcon from '@/components/icons/BreakerIcon';
import classes from './TitleList.module.scss';

type TitleListProps = {
  titles: string[];
  firstIconText: string;
  secondIconText?: string;
  actionBar?: ReactNode;
  firstIconAction?: (val?: string) => Promise<void> | undefined;
  secondIconAction?: () => Promise<void> | undefined;
};

const TitleList: React.FC<TitleListProps> = ({
  titles,
  firstIconText,
  secondIconText,
  actionBar,
  firstIconAction,
  secondIconAction
}) => {
  const [currentTitles, setCurrentTitles] = useState(titles);
  const [searchTerm, setSearchTerm] = useState('');

  const { theme } = useAppSelector((state) => state.theme);

  const handleSearch = useCallback(() => {
    if (searchTerm === '') {
      setCurrentTitles(titles);
      return;
    }

    const searchResults: string[] = [];
    const regex = new RegExp(searchTerm, 'i');

    for (const title of titles) {
      if (regex.test(title)) {
        searchResults.push(title);
      }
    }
    setCurrentTitles(searchResults);
  }, [searchTerm, titles]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchTerm]);

  const renderedTitles = currentTitles.map((title) => (
    <div key={title} className={classes['title__cell']}>
      <div className={classes['edit-icon']}>
        <span
          onClick={firstIconAction ? () => firstIconAction(title) : undefined}
        >
          <EditIcon />
        </span>
      </div>
      <div className={classes['test-icon']}>
        <span onClick={secondIconAction ? secondIconAction : undefined}>
          <BreakerIcon />
        </span>
      </div>
      <p className={classes['title-content']}>
        <Link href={`/problem/${title}`}>
          {title}
        </Link>
      </p>
    </div>
  ));

  return (
    <div
      className={`${classes['titles-selection']} ${
        classes[`titles-selection--${theme}`]
      }`}
    >
      <div className={classes['top-bar']}>
        <div className={classes['title__searchbar']}>
          <SearchBar
            setSingleSearchTerm={setSearchTerm}
            currentSearch={searchTerm}
          />
          <Button
            color="secondary"
            extraStyle={{ padding: '1rem' }}
            onClick={() => setSearchTerm('')}
          >
            <ResetIcon />
          </Button>
        </div>
        {actionBar && actionBar}
      </div>
      <div
        role="table"
        className={`${classes['titles__table']} ${
          classes[`titles-table--${theme}`]
        }`}
      >
        <div className={classes['titles-table__header']}>
          <div role="row" className={classes['edit-header']}>
            {firstIconText}
          </div>
          <div role="row" className={classes['tests-header']}>
            Test
          </div>
          <div role="row" className={classes['title-header']}>
            <span> {secondIconText}</span>
          </div>
        </div>
        <div role="table-body" className={classes['title-table__body']}>
          {renderedTitles}
        </div>
      </div>
    </div>
  );
};

export default TitleList;
