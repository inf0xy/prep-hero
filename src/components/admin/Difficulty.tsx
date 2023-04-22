import { GeneralFormData } from '@/types/dataTypes';
import { Dispatch, SetStateAction } from 'react';

type DifficultyProps = {
  setGeneralInfo: Dispatch<SetStateAction<GeneralFormData>>;
};

const Difficulty: React.FC<DifficultyProps> = ({ setGeneralInfo }) => {
  return (
    <>
      <div key="Easy" className="flex space-x-3">
        <label>Easy</label>
        <input
          type="radio"
          name="radio-5"
          className={`radio radio-success`}
          value="Easy"
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              difficulty: e.target.value
            }))
          }
        />
      </div>
      <div key="Medium" className="flex space-x-3">
        <label>Medium</label>
        <input
          type="radio"
          name="difficulty"
          className={`radio radio-warning`}
          value="Medium"
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              difficulty: e.target.value
            }))
          }
        />
      </div>
      <div key="Hard" className="flex space-x-3">
        <label>Hard</label>
        <input
          type="radio"
          name="radio-5"
          className={`radio radio-error`}
          value="Hard"
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