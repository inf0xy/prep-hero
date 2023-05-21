import { useState, Dispatch, SetStateAction } from 'react';
import { tabSizeOptions } from '@/helpers/formFields';
import { CodeOptions, Option } from '@/types/dataTypes';
import DropDown from '../Dropdown';
import classes from './TabSizeSelection.module.scss';

interface TabSizeSelectionProps {
  setTabSize: Dispatch<SetStateAction<CodeOptions>>;
  options: CodeOptions;
}

const TabSizeSelection: React.FC<TabSizeSelectionProps> = ({ setTabSize, options }) => {
  const currentOption = {
    label: `${options.tabSize} spaces`,
    value: options.tabSize.toString()
  };

  const [selected, setSelected] = useState<null | Option>(currentOption);

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
