import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LargeListDropDown from '../reusables/LargeListDropDown';
import { categoryListOptions } from '@/helpers/formFields';
import { SearchCriteria, SearchOrForm, Option } from '@/types/dataTypes';

interface CategoryListProps {
  setCategory: Dispatch<SetStateAction<SearchOrForm>>;
  searchCriteria: SearchCriteria;
}

const CategoryList: React.FC<CategoryListProps> = ({
  setCategory,
  searchCriteria
}) => {
  const [selected, setSelected] = useState<Option[]>([]);

  useEffect(() => {
    if (searchCriteria.category === '') {
      setSelected([]);
    }
  }, [searchCriteria]);

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
      listName='categories'
    />
  );
};

export default CategoryList;
