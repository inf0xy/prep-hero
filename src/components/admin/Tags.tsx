import { tagSelection } from '@/helpers/formFields';
import { GeneralFormData } from '@/types/dataTypes';
import { Dispatch, SetStateAction } from 'react';

type TagsProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
};

const Tags: React.FC<TagsProps> = ({ setGeneralInfo }) => {
  const renderedTags = tagSelection.map((el, index) => (
    <div key={el} className="form-control w-fit mt-2">
      <label className="label cursor-pointer">
        <span className="label-text text-[1.5rem]">{el}</span>
        <input
          type="checkbox"
          className={`checkbox checkbox-warning ml-3`}
          value={el}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              tags: prev.tags.includes(e.target.value)
                ? [...prev.tags.filter((el) => el !== e.target.value)]
                : [...prev.tags, e.target.value]
            }))
          }
        />
      </label>
    </div>
  ));

  return <>{renderedTags}</>;
};

export default Tags;
