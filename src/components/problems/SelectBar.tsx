import { Dispatch, SetStateAction, useState } from 'react';
import { SearchCriteria } from '@/types/dataTypes';
import classes from './SelectBar.module.scss';

import CategoryList from '@/components/problems/CategoryList';
import DifficultyList from '@/components/problems/DifficultyList';
import TagList from '@/components/problems/TagList';
import CompanyList from '@/components/problems/CompanyList';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ShuffleIcon from '@/components/icons/ShuffleIcon';
import ResetIcon from '@/components/icons/ResetIcon';

type SelectBarProps = {
  searchCriteria: SearchCriteria;
  setSearchCriteria: Dispatch<SetStateAction<SearchCriteria>>;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  showNotes: boolean
};

const SelectBar: React.FC<SelectBarProps> = ({
  searchCriteria,
  setSearchCriteria,
  setShowNotes,
  showNotes
}) => {

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
    <>
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
          color="secondary"
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
          color="primary"
        >
          <ResetIcon width={15} height={15} />
        </Button>
      </div>
      <input
        data-tooltip="Show / Hide all notes"
        type="checkbox"
        className={`toggle toggle-lg ${classes['note-switch']}`}
        checked={showNotes}
        onChange={() => setShowNotes((prev) => !prev)}
      />
    </>
  );
};

export default SelectBar;
