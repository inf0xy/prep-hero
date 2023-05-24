import { useState, Dispatch, SetStateAction } from 'react';
import { languageOptions } from '@/helpers/formFields';
import { Option } from '@/types/dataTypes';
import DropDown from '../Dropdown';
import classes from './LanguageSelection.module.scss';

interface LanguageSelectionProps {
  setLanguage: Dispatch<SetStateAction<string>>;
  multiOptions: boolean;
  width?: string;
  className?: string;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  setLanguage,
  multiOptions,
  width,
  className
}) => {
  const intialSelection = multiOptions
    ? {
        label: 'All',
        value: 'all'
      }
    : {
        label: 'Python',
        value: 'python'
      };

  const [selected, setSelected] = useState<null | Option>(intialSelection);

  const handleSelectLanguage: (option: Option) => void = (option) => {
    setSelected(option);
    setLanguage(option.value);
  };

  return (
    <div
      className={`${classes['language-selection']} text-[1.2rem] ${className}`}
    >
      <DropDown
        value={selected!}
        options={
          multiOptions
            ? [{ label: 'All', value: 'all' }, ...languageOptions]
            : languageOptions
        }
        onChange={handleSelectLanguage}
        defaultText={selected?.label!}
        width={width ? width : '11rem'}
      />
    </div>
  );
};

export default LanguageSelection;
