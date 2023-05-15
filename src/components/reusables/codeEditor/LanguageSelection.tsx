import { useState, Dispatch, SetStateAction } from 'react';
import { languageOptions } from '@/helpers/formFields';
import DropDown from '../Dropdown';
import classes from './LanguageSelection.module.scss';

type Option = {
  label: string;
  value: string;
};

interface LanguageSelectionProps {
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ setLanguage }) => {
  const [selected, setSelected] = useState<null | Option>({
    label: 'Python', value: 'python'
  });

  const handleSelectLanguage: (option: Option) => void = (option) => {
    setSelected(option);
    setLanguage(option.value);
  };

  return (
    <div className={classes['language-selection']}>
      <DropDown
        value={selected!}
        options={languageOptions}
        onChange={handleSelectLanguage}
        defaultText={selected?.label!}
        width='10rem'
      />
    </div>
  );
};

export default LanguageSelection;
