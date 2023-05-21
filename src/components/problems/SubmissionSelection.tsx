import { useState, Dispatch, SetStateAction } from 'react';
import { submissionStatusOptions } from '@/helpers/formFields';
import { Option } from '@/types/dataTypes';
import DropDown from '../reusables/Dropdown';
import classes from './SubmissionSelection.module.scss';

interface SubmissionSelectionProps {
  setSubmissionStatus: Dispatch<SetStateAction<string>>;
  width?: string;
  className?: string;
}

const SubmissionSelection: React.FC<SubmissionSelectionProps> = ({
  setSubmissionStatus,
  width,
  className
}) => {
  const [selected, setSelected] = useState<null | Option>({
    label: 'All',
    value: 'all'
  });

  const handleSelectStatus: (option: Option) => void = (option) => {
    setSelected(option);
    setSubmissionStatus(option.value);
  };

  return (
    <div
      className={`${classes['status-selection']} text-[1.2rem] ${className}`}
    >
      <DropDown
        value={selected!}
        options={submissionStatusOptions}
        onChange={handleSelectStatus}
        defaultText={selected?.label!}
        width={width ? width : '10rem'}
      />
    </div>
  );
};

export default SubmissionSelection;
