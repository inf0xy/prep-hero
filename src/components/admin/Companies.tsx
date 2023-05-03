import { Dispatch, SetStateAction } from 'react';
import { GeneralFormData } from '@/types/dataTypes';
import { companies } from '@/helpers/formFields';

type CompaniesProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
  currentSelectedCompanies: string[]
};

const Companies: React.FC<CompaniesProps> = ({ setGeneralInfo, currentSelectedCompanies }) => {
  const renderedCompanies = companies.map((el) => (
    <div key={el} className="form-control w-fit mt-2">
      <label className="label cursor-pointer">
        <span className="text-[1.5rem]">{el}</span>
        <input
          type="checkbox"
          className={`checkbox checkbox-success ml-3`}
          value={el}
          checked={currentSelectedCompanies.includes(el)}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              companies: prev.companies.includes(e.target.value)
                ? [...prev.companies.filter(el => el !== e.target.value)]
                : [...prev.companies, e.target.value]
            }))
          }
        />
      </label>
    </div>
  ));

  return <>{renderedCompanies}</>;
};

export default Companies;
