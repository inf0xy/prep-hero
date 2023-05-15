import { useState, Dispatch, SetStateAction } from 'react';
import { fontOptions } from '@/helpers/formFields';
import { CodeOptions } from '@/types/dataTypes';
import DropDown from '../Dropdown';
import classes from './FontSelection.module.scss';

type Option = {
  label: string;
  value: string;
};

interface FontSelectionProps {
  setFont: Dispatch<SetStateAction<CodeOptions>>;
}

const FontSelection: React.FC<FontSelectionProps> = ({ setFont }) => {
  const [selected, setSelected] = useState<null | Option>({
    label: '14px',
    value: '14'
  });

  const handleSelectFont: (option: Option) => void = (option) => {
    setSelected(option);
    setFont((prev) => ({
      ...prev,
      fontSize: +option.value
    }));
  };

  return (
    <div className={classes['font-selection']}>
      <DropDown
        value={selected!}
        options={fontOptions}
        onChange={handleSelectFont}
        defaultText={selected?.label!}
        width="11rem"
      />
    </div>
  );
};

export default FontSelection;
