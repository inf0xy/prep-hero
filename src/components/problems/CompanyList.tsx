import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import LargeListDropDown from '../reusables/LargeListDropDown';
import { companyListOption } from '@/helpers/formFields';
import { SearchCriteria, SearchOrForm } from '@/types/dataTypes';

type Option = {
  label: string;
  value: string;
};

interface CompanyListProps {
  setCompany: Dispatch<SetStateAction<SearchOrForm>>;
  searchCriteria: SearchCriteria;
}

const CompanyList: React.FC<CompanyListProps> = ({
  setCompany,
  searchCriteria
}) => {
  const [selected, setSelected] = useState<Option[]>([]);

  useEffect(() => {
    setSelected((prev) =>
      prev.filter((option) => searchCriteria.companies.includes(option.value))
    );
  }, [searchCriteria]);

  const handleSelectCompany: (option: Option) => void = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? [...prev.filter((el) => el !== option)]
        : [...prev, option]
    );
    setCompany((prev) => ({
      ...prev,
      companies: prev.companies.includes(option.value)
        ? prev.companies.filter((el) => el != option.value)
        : [...prev.companies, option.value]
    }));
  };

  return (
    <LargeListDropDown
      value={selected!}
      options={companyListOption}
      onChange={handleSelectCompany}
      defaultText="Company"
      width="12rem"
    />
  );
};

export default CompanyList;
