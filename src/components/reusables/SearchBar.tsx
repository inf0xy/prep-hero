import { Dispatch, SetStateAction, useEffect, useState, MutableRefObject } from 'react';
import SearchIcon from '../icons/SearchIcon';
import { SearchCriteria } from '@/types/dataTypes';

type SearchBarProps = {
  setSearchTerm: Dispatch<SetStateAction<SearchCriteria>>;
  defaultText?: string;
  currentSearch: string
};

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchTerm,
  defaultText,
  currentSearch
}) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (searchInput.length) {
      const timeoutId = setTimeout(function () {
        setSearchTerm((prev) => ({ ...prev, text: searchInput.trim() }));
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchInput, setSearchTerm]);

  useEffect(() => {
    if (currentSearch === '') {
      setSearchInput('');
    }
  }, [currentSearch]);

  return (
    <div className="flex px-5 h-[3rem] w-[15rem] bg-[#454545] rounded-md items-center space-x-3">
      <SearchIcon className="w-8 h-8" />
      <input
        className="w-full bg-[#454545] focus:outline-none text-[1.5rem]"
        value={searchInput}
        placeholder={defaultText}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
