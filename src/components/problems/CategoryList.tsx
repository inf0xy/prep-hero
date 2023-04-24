import { Dispatch, SetStateAction, useState } from 'react';
import LargeListDropDown from '../reusables/LargeListDropDown';
import { categoryListOptions } from '@/helpers/formFields';
import { SearchCriteria } from '@/types/dataTypes';

type Option = {
  label: string;
  value: string;
};

interface CategoryListProps {
  setCategory: Dispatch<SetStateAction<SearchCriteria>>;
}

const CategoryList: React.FC<CategoryListProps> = ({ setCategory }) => {
  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelectCategoryList: (option: Option) => void = (option) => {
    setSelected((prev) => (prev.includes(option) ? [] : [option]));
    setCategory((prev) => ({ ...prev, category: option.value }));
  };

  return (
    <LargeListDropDown
      value={selected}
      options={categoryListOptions}
      onChange={handleSelectCategoryList}
      defaultText="Category"
      width="12rem"
    />
  );
};

export default CategoryList;
