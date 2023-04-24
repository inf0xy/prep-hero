import { Dispatch, SetStateAction, useState } from 'react';
import DropDown from '@/components/reusables/Dropdown';
import { difficultyListOptions } from '@/helpers/formFields';
import { SearchCriteria } from '@/types/dataTypes';

type Option = {
  label: string;
  value: string;
};

interface DifficultyListProps {
  setDifficulty: Dispatch<SetStateAction<SearchCriteria>>;
}

const DifficultyList: React.FC<DifficultyListProps> = ({ setDifficulty }) => {
  const [selected, setSelected] = useState<null | Option>(null);

  const handleSelectDifficulty: (option: Option) => void = (option) => {
    setSelected(option);
    setDifficulty((prev) => ({ ...prev, difficulty: option.value }));
  };

  return (
    <DropDown
      value={selected!}
      options={difficultyListOptions}
      onChange={handleSelectDifficulty}
      defaultText="Difficulty"
      width="12rem"
    />
  );
};

export default DifficultyList;
