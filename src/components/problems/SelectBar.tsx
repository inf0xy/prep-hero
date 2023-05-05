import { Dispatch, SetStateAction, useState } from 'react';
import { SearchCriteria, SearchOrForm } from '@/types/dataTypes';
import classes from './SelectBar.module.scss';

import CategoryList from '@/components/problems/CategoryList';
import DifficultyList from '@/components/problems/DifficultyList';
import TagList from '@/components/problems/TagList';
import CompanyList from '@/components/problems/CompanyList';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ShuffleIcon from '@/components/icons/ShuffleIcon';
import ResetIcon from '@/components/icons/ResetIcon';
import { useSession } from 'next-auth/react';
import ListName from '../admin/ListName';

type SelectBarProps = {
  searchCriteria: SearchCriteria;
  setSearchCriteria: Dispatch<SetStateAction<SearchOrForm>>;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  showNotes: boolean;
};

const SelectBar: React.FC<SelectBarProps> = ({
  searchCriteria,
  setSearchCriteria,
  setShowNotes,
  showNotes
}) => {
  const { data: session } = useSession();

  const handleSearchReset = () => {
    setSearchCriteria({
      listName: '',
      category: '',
      difficulty: '',
      tags: [],
      companies: [],
      text: ''
    });
  };

  return (
    <>
    <ListName setListName={setSearchCriteria}/>
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
      {session && (
        <input
          data-tooltip="Show / Hide all notes"
          type="checkbox"
          className={`toggle toggle-lg ${classes['note-switch']}`}
          checked={showNotes}
          onChange={() => setShowNotes((prev) => !prev)}
        />
      )}
    </>
  );
};

export default SelectBar;
