import { Dispatch, SetStateAction, useState } from 'react';
import DropDown from '../Dropdown';
import { listNameOptions } from '@/helpers/formFields';
import { GeneralFormData } from '@/helpers/formFields';

type Option = {
  label: string;
  value: string;
};

interface ListNameProps {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>
}

const ListName: React.FC<ListNameProps> = ({ setGeneralInfo }) => {
  const [selected, setSelected] = useState<null | Option>(null);

  const handleSelectListName: (option: Option) => void = (option) => {
    setSelected(option);
    setGeneralInfo(prev => ({
      ...prev,
      listName: option.value
    }));
  };

  return (
    <DropDown
      value={selected!}
      options={listNameOptions}
      onChange={handleSelectListName}
      defaultText="Select List Name"
      width='15rem'
    />
  );
};

export default ListName;
