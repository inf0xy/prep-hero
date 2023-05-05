import { Dispatch, SetStateAction, useState } from 'react';
import DropDown from '@/components/reusables/Dropdown';
import { listNameOptions } from '@/helpers/formFields';
import { SearchOrForm } from '@/types/dataTypes';

type Option = {
  label: string;
  value: string;
};

interface ListNameProps {
  setListName: Dispatch<SetStateAction<SearchOrForm>>
}

const ListName: React.FC<ListNameProps> = ({ setListName }) => {
  const [selected, setSelected] = useState<null | Option>(null);

  const handleSelectListName: (option: Option) => void = (option) => {
    setSelected(option);
    setListName(prev => ({
      ...prev,
      listName: option.value
    }));
  };

  return (
    <DropDown
      value={selected!}
      options={listNameOptions}
      onChange={handleSelectListName}
      defaultText="List"
      width='12rem'
    />
  );
};

export default ListName;
