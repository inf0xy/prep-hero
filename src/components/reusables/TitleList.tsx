import { ReactNode, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ResetIcon from '@/components/icons/ResetIcon';
import classes from './TitleList.module.scss';

type TitleListProps = {
  listType: 'problems' | 'notes' | string;
  titles: string[];
  firstIconText: string;
  secondIconText?: string;
  firstIcon?: ReactNode,
  secondIcon?: ReactNode,
  testTitles?: string[];
  actionBar?: ReactNode;
  titleAction?: () => {};
  firstIconAction?: (val?: string) => Promise<void> | undefined;
  secondIconAction?: (val?: string) => Promise<void> | undefined;
};

const TitleList: React.FC<TitleListProps> = ({
  listType,
  titles,
  firstIconText,
  secondIconText,
  firstIcon,
  secondIcon,
  testTitles,
  actionBar,
  titleAction,
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
          {secondIcon}
        </span>
      </div>
      <div className={classes['test-icon']}>
        <span
          onClick={secondIconAction ? () => secondIconAction(title) : undefined}
          className={`${
            testTitles && testTitles.includes(title) ? 'text-cyan-500' : ''
          }`}
        >
          {firstIcon}
        </span>
      </div>
      <p className={classes['title-content']} onClick={titleAction}>
        {!titleAction && <Link href={`/problem/${title}`}>{title}</Link>}
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
            {secondIconText}
          </div>
          <div role="row" className={classes['title-header']}>
            Title
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
