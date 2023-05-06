import { listNameSelections } from '@/helpers/formFields';
import { SearchOrForm } from '@/types/dataTypes';
import { Dispatch, SetStateAction } from 'react';

type ListSelectionProps = {
  setGeneralInfo: Dispatch<SetStateAction<SearchOrForm>>;
  currentSelectedListName: string[];
};

const ListSelection: React.FC<ListSelectionProps> = ({
  setGeneralInfo,
  currentSelectedListName
}) => {
  const renderedListSelection = listNameSelections.map((el) => (
    <div key={el} className="form-control w-fit mt-2">
      <label className="label cursor-pointer">
        <span className="text-[1.5rem]">{el}</span>
        <input
          type="checkbox"
          className={`checkbox checkbox-primary ml-3`}
          value={el}
          checked={currentSelectedListName.includes(el)}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              listNames: prev.listNames.includes(e.target.value)
                ? [
                    ...(prev.listNames as string[]).filter(
                      (el) => el !== e.target.value
                    )
                  ]
                : [...prev.listNames, e.target.value]
            }))
          }
        />
      </label>
    </div>
  ));

  return <>{renderedListSelection}</>;
};

export default ListSelection;
