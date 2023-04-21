import { Dispatch, SetStateAction } from 'react';
import { categorySelection } from '@/helpers/formFields';
import { GeneralFormData } from '@/helpers/formFields';

type CategoriesProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
};

const Categories: React.FC<CategoriesProps> = ({ setGeneralInfo }) => {
  const renderedCategories = categorySelection.map((el) => (
    <div key={el} className="flex space-x-3">
      <input
        type="radio"
        name="radio-5"
        className={`radio radio-info`}
        value={el}
        onChange={(e) =>
          setGeneralInfo((prev) => ({
            ...prev,
            category: e.target.value
          }))
        }
      />
      <label className="text-gray-400">{el}</label>
    </div>
  ));

  return <>{renderedCategories}</>;
};

export default Categories;
