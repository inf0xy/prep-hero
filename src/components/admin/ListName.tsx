import { Dispatch, SetStateAction, useState } from 'react';
import DropDown from '@/components/reusables/Dropdown';
import { listNameOptions } from '@/helpers/formFields';
import { SearchOrForm, Option } from '@/types/dataTypes';

interface ListNameProps {
  setListName: Dispatch<SetStateAction<SearchOrForm>>;
}

const ListName: React.FC<ListNameProps> = ({ setListName }) => {
  const [selected, setSelected] = useState<null | Option>(null);

  const handleSelectListName: (option: Option) => void = (option) => {
    setSelected(option);
    setListName((prev) => ({
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
      width="12.5rem"
    />
  );
};

export default ListName;
