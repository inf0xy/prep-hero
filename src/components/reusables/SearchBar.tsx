import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchIcon from '../icons/SearchIcon';
import { SearchCriteria } from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';

type SearchBarProps = {
  setSearchTerm: Dispatch<SetStateAction<SearchCriteria>>;
  defaultText?: string;
  currentSearch: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchTerm,
  defaultText,
  currentSearch
}) => {
  const [searchInput, setSearchInput] = useState('');
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const timeoutId = setTimeout(function () {
      setSearchTerm((prev) => ({ ...prev, text: searchInput.trim() }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, setSearchTerm]);

  useEffect(() => {
    if (currentSearch === '') {
      setSearchInput('');
    }
  }, [currentSearch]);

  return (
    <div
      className={`flex px-5 h-[3rem] w-[15rem] rounded-md items-center space-x-3 ${
        theme === 'dark' ? 'bg-[#454545]' : 'bg-gray-100 border border-gray-400'
      }`}
    >
      <SearchIcon
        className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
      />
      <input
        className={`w-full focus:outline-none text-[1.5rem] placeholder:text-gray-400 ${
          theme === 'dark'
            ? 'bg-[#454545] text-gray-100'
            : 'bg-gray-100 text-gray-600'
        }`}
        value={searchInput}
        placeholder={defaultText}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
