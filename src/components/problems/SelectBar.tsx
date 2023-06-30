import { Dispatch, SetStateAction, useState } from 'react';
import { SearchCriteria, SearchOrForm } from '@/types/dataTypes';

import CategoryList from '@/components/problems/CategoryList';
import DifficultyList from '@/components/problems/DifficultyList';
import TagList from '@/components/problems/TagList';
import CompanyList from '@/components/problems/CompanyList';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ShuffleButton from '../reusables/ShuffleButton';
import ResetIcon from '@/components/icons/ResetIcon';
import { useSession } from 'next-auth/react';
import ListName from '../admin/ListName';
import Tooltip from '../reusables/Tooltip';

import classes from './SelectBar.module.scss';
import variables from '@/styles/variables.module.scss';

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
      <ListName setListName={setSearchCriteria} />
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
      <div className={classes.utils}>
      <SearchBar
        setSearchTerm={setSearchCriteria}
        defaultText="Search"
        currentSearch={searchCriteria.text}
      />

        <div className={classes.random}>
          <Tooltip
            text="Random question"
            direction="bottom"
            className="w-[14rem] py-4"
          >
            <ShuffleButton />
          </Tooltip>
        </div>
        <div className={classes.reset} onClick={handleSearchReset}>
          <Tooltip
            text="Reset search"
            direction="bottom"
            className="w-[11rem] py-4"
          >
            <Button
              extraStyle={{
                borderRadius: '5px',
                height: '3rem',
                width: '4rem',
                padding: '0',
                backgroundColor: `${variables.colorSecondary100}`
              }}
              color="primary"
            >
              <ResetIcon width={15} height={15} />
            </Button>
          </Tooltip>
        </div>
      </div>
      {session && (
        <Tooltip
          text="Toggle all notes"
          direction="bottom"
          className="w-[13rem] py-4"
        >
          <input
            type="checkbox"
            className={`toggle toggle-lg ${classes['note-switch']}`}
            checked={showNotes}
            onChange={() => setShowNotes((prev) => !prev)}
          />
        </Tooltip>
      )}
    </>
  );
};

export default SelectBar;
