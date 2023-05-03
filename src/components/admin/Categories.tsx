import { Dispatch, SetStateAction } from 'react';
import { categorySelection } from '@/helpers/formFields';
import { GeneralFormData } from '@/types/dataTypes';

type CategoriesProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
  currentSelectedCategory: string;
};

const Categories: React.FC<CategoriesProps> = ({ setGeneralInfo, currentSelectedCategory }) => {
  const renderedCategories = categorySelection.map((el) => (
    <div key={el} className="flex space-x-3">
      <input
        type="radio"
        name="category"
        className={`radio radio-info`}
        value={el}
        checked={currentSelectedCategory === el}
        onChange={(e) =>
          setGeneralInfo((prev) => ({
            ...prev,
            category: e.target.value
          }))
        }
      />
      {/* <label className="text-gray-400">{el}</label> */}
      <label>{el}</label>
    </div>
  ));

  return <>{renderedCategories}</>;
};

export default Categories;
