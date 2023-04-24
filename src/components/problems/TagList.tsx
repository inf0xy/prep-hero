import { Dispatch, SetStateAction, useState } from 'react';
import LargeListDropDown from '../reusables/LargeListDropDown';
import { tagListOptions } from '@/helpers/formFields';
import { SearchCriteria } from '@/types/dataTypes';

type Option = {
  label: string;
  value: string;
};

interface TagListProps {
  setTags: Dispatch<SetStateAction<SearchCriteria>>;
}

const TagList: React.FC<TagListProps> = ({ setTags }) => {
  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelectTag: (option: Option) => void = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? [...prev.filter((el) => el !== option)]
        : [...prev, option]
    );
    setTags((prev) => ({
      ...prev,
      tags: prev.tags.includes(option.value)
        ? prev.tags.filter((el) => el != option.value)
        : [...prev.tags, option.value]
    }));
  };

  return (
    <LargeListDropDown
      value={selected!}
      options={tagListOptions}
      onChange={handleSelectTag}
      defaultText="Tags"
      width="8rem"
    />
  );
};

export default TagList;
