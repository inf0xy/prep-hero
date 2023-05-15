import { useState, Dispatch, SetStateAction } from 'react';
import { tabSizeOptions } from '@/helpers/formFields';
import { CodeOptions } from '@/types/dataTypes';
import DropDown from '../Dropdown';
import classes from './TabSizeSelection.module.scss';

type Option = {
  label: string;
  value: string;
};

interface TabSizeSelectionProps {
  setTabSize: Dispatch<SetStateAction<CodeOptions>>;
}

const TabSizeSelection: React.FC<TabSizeSelectionProps> = ({ setTabSize }) => {
  const [selected, setSelected] = useState<null | Option>({
    label: '4 spaces', value: '4'
  });

  const handleSelectTabSize: (option: Option) => void = (option) => {
    setSelected(option);
    setTabSize((prev) => ({
      ...prev,
      tabSize: +option.value
    }));
  };

  return (
    <div className={classes['tab-size-selection']}>
      <DropDown
        value={selected!}
        options={tabSizeOptions}
        onChange={handleSelectTabSize}
        defaultText={selected?.label!}
        width='11rem'
      />
    </div>
  );
};

export default TabSizeSelection;
