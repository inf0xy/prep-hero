import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SearchOrForm } from '@/types/dataTypes';
import SearchIcon from '../icons/SearchIcon';
import { useAppSelector } from '@/hooks/hooks';

type SearchBarProps = {
  currentSearch: string;
  defaultText?: string;
  setSearchTerm?: Dispatch<SetStateAction<SearchOrForm>>;
  setSingleSearchTerm?: Dispatch<SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  defaultText,
  currentSearch,
  setSearchTerm,
  setSingleSearchTerm
}) => {
  const [searchInput, setSearchInput] = useState('');
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (setSearchTerm) {
      const timeoutId = setTimeout(function () {
        setSearchTerm((prev) => ({ ...prev, text: searchInput.trim() }));
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    } else if (setSingleSearchTerm) {
      const timeoutId = setTimeout(() => {
        setSingleSearchTerm(searchInput.trim());
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchInput, setSearchTerm, setSingleSearchTerm]);

  useEffect(() => {
    if (currentSearch === '') {
      setSearchInput('');
    }
  }, [currentSearch]);

  return (
    <div
      className={`flex px-5 h-[3rem] w-[15rem] rounded-md items-center space-x-3 ${
        theme === 'dark'
          ? 'bg-[#454545]'
          : 'bg-slate-100 border self-center py-6'
      }`}
    >
      <SearchIcon
        className={`w-8 h-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
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
