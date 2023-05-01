import { GeneralFormData } from '@/types/dataTypes';
import { Dispatch, SetStateAction } from 'react';

type DifficultyProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
  currentSelectedDiffs: string
};

enum Diff {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

const Difficulty: React.FC<DifficultyProps> = ({ setGeneralInfo, currentSelectedDiffs }) => {
  return (
    <>
      <div key={Diff.Easy} className="flex space-x-3">
        <label>{Diff.Easy}</label>
        <input
          type="radio"
          name="radio-5"
          className={`radio radio-success`}
          value={Diff.Easy}
          checked={currentSelectedDiffs === Diff.Easy}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              difficulty: e.target.value
            }))
          }
        />
      </div>
      <div key={Diff.Medium} className="flex space-x-3">
        <label>{Diff.Medium}</label>
        <input
          type="radio"
          name="difficulty"
          className={`radio radio-warning`}
          value={Diff.Medium}
          checked={currentSelectedDiffs === Diff.Medium}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              difficulty: e.target.value
            }))
          }
        />
      </div>
      <div key={Diff.Hard} className="flex space-x-3">
        <label>{Diff.Hard}</label>
        <input
          type="radio"
          name="radio-5"
          className={`radio radio-error`}
          value={Diff.Hard}
          checked={currentSelectedDiffs === Diff.Hard}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              difficulty: e.target.value
            }))
          }
        />
      </div>
    </>
  );
};

export default Difficulty;