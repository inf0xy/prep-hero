import { ChangeEvent, ReactElement, useState, useRef } from 'react';
import classes from './ProblemForm.module.css';
import {
  categorySelection,
  difficulties,
  tagSelection,
  companies
} from '../../helpers/formFields';

type Categories = {
  [key: string]: string[];
};

type GeneralFormData = {
  listName: string;
  title: string;
  difficulty: string;
  categories: string;
  tags: string[];
  companies: string[];
  addedCompanies: string;
  leetcodeLink: string;
  videoLink: string;
};

const formatString = (text: string) => {
  return text.replace(/\b\w/g, (match) => match.toUpperCase());
};

const ProblemForm = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralFormData>({
    listName: '',
    title: '',
    difficulty: '',
    categories: '',
    tags: [],
    companies: [],
    addedCompanies: '',
    leetcodeLink: '',
    videoLink: ''
  });

  console.log(generalInfo);

  // const handleCompaniesInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.trim().length > 0) {
  //     const addedCompanies = e.target.value.split(',').map((el) => formatString(el.trim()));
  //     setGeneralInfo(prev => ({
  //       ...prev,
  //       companies: [...prev.companies, ...addedCompanies]
  //     }));
  //   }
  // };

  const renderedDifficulty = difficulties.map(({ text, color }) => (
    <div key={text} className="flex space-x-3">
      <label>{text}</label>
      <input
        type="radio"
        name="radio-5"
        className={`radio radio-${color}`}
        value={text}
        onChange={(e) =>
          setGeneralInfo((prev) => ({
            ...prev,
            difficulty: e.target.value
          }))
        }
      />
    </div>
  ));

  let renderedSelection: ReactElement[] = [];
  for (let group in categorySelection) {
    (categorySelection as Categories)[group].map((el) => {
      let groupColor = '';
      if (group === 'first') {
        groupColor = 'info';
      } else if (group === 'second') {
        groupColor = 'accent';
      } else if (group === 'third') {
        groupColor = 'primary';
      }
      renderedSelection.push(
        <div key={el} className="flex space-x-3">
          <input
            type="radio"
            name="radio-5"
            className={`radio radio-${groupColor}`}
            value={el}
            onChange={(e) =>
              setGeneralInfo((prev) => ({
                ...prev,
                categories: e.target.value
              }))
            }
          />
          <label className="text-gray-400">{el}</label>
        </div>
      );
    });
  }

  const renderedTags = tagSelection.map((el, index) => {
    let color = '';
    if (index > 23) {
      color = 'info';
    } else if (index > 12) {
      color = 'warning';
    } else {
      color = 'secondary';
    }
    return (
      <div key={el} className="form-control w-fit mt-2">
        <label className="label cursor-pointer">
          <span className="label-text text-[1.5rem]">{el}</span>
          <input
            type="checkbox"
            className={`checkbox checkbox-${color} ml-3`}
            value={el}
            onChange={(e) =>
              setGeneralInfo((prev) => ({
                ...prev,
                tags: [...prev.tags, e.target.value]
              }))
            }
          />
        </label>
      </div>
    );
  });

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

  return (
    <form className={classes['problem-form-container']}>
      <div className={classes['form-controls']}>
        <label>
          List Name: <span className={classes.required}>*</span>
        </label>
        <input className={classes.field} />
      </div>
      <div className={classes['form-controls']}>
        <label>
          Title: <span className={classes.required}>*</span>
        </label>
        <input className={classes.field} />
      </div>
      <div className={classes.difficulty}>
        <label>
          Difficulty: <span className={classes.required}>*</span>
        </label>
        <div className="flex space-x-4 text-font-medium">
          {renderedDifficulty}
        </div>
      </div>
      <div className={classes['form-controls']}>
        <label>
          Category: <span className={classes.required}>*</span>
        </label>
        <div className={classes.category}>{renderedSelection}</div>
      </div>
      <div className={classes['form-controls']}>
        <label>
          Tags: <span className={classes.required}>*</span>
        </label>
        <div className={classes.tags}>{renderedTags}</div>
      </div>
      <div className={classes['form-controls']}>
        <label>
          Companies: <span className={classes.required}>*</span>
        </label>
        <div className={classes.companies}>{renderedCompanies}</div>
        <input
          className={`${classes.field} ${classes['added-companies']}`}
          placeholder="Google, Facebook, ..."
          value={generalInfo.addedCompanies}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              addedCompanies: e.target.value
            }))
          }
        />
      </div>
      <div
        className={`${classes['form-controls']} ${classes['leetcode-link']}`}
      >
        <label>
          Leetcode link: <span className={classes.required}>*</span>
        </label>
        <input
          value={generalInfo.leetcodeLink}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              leetcodeLink: e.target.value
            }))
          }
          className={`${classes.field} `}
        />
      </div>
      <div className={`${classes['form-controls']} ${classes['video-link']}`}>
        <label>
          Solution video link: <span className={classes.required}>*</span>
        </label>
        <input
          value={generalInfo.videoLink}
          onChange={(e) =>
            setGeneralInfo((prev) => ({
              ...prev,
              videoLink: e.target.value
            }))
          }
          className={classes.field}
        />
      </div>
    </form>
  );
};

export default ProblemForm;
