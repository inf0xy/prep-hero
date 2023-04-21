import { Dispatch, SetStateAction } from 'react';
import { GeneralFormData } from '@/helpers/formFields';
import { companies } from '@/helpers/formFields';

type CompaniesProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
};

const Companies: React.FC<CompaniesProps> = ({ setGeneralInfo }) => {
  const renderedCompanies = companies.map((el) => (
    <div key={el} className="form-control w-fit mt-2">
      <label className="label cursor-pointer">
        <span className="label-text text-[1.5rem]">{el}</span>
        <input
          type="checkbox"
          className={`checkbox checkbox-success ml-3`}
          value={el}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              companies: [...prev.companies, e.target.value]
            }))
          }
        />
      </label>
    </div>
  ));

  return <>{renderedCompanies}</>;
};

export default Companies;
