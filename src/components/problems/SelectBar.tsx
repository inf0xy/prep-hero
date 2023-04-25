import { Dispatch, SetStateAction } from 'react';
import { SearchCriteria } from '@/types/dataTypes';
import classes from './SelectBar.module.css';

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
};

const SelectBar: React.FC<SelectBarProps> = ({ searchCriteria, setSearchCriteria }) => {
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
    </>
  );
};

export default SelectBar;
