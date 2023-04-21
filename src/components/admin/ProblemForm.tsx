import { ChangeEvent, useState, useRef } from 'react';
import classes from './ProblemForm.module.css';
import Difficulty from './Difficulty';
import Tags from './Tags';
import Companies from './Companies';
import Categories from './Categories';
import Editor from './Editor';

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
  const [description, setDescription] = useState('');

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
          <Difficulty setGeneralInfo={setGeneralInfo} />
        </div>
      </div>
      <fieldset className={classes['form-controls']}>
        <legend>
          Category: <span className={classes.required}>*</span>
        </legend>
        <div className={classes.category}>
          <Categories setGeneralInfo={setGeneralInfo} />
        </div>
      </fieldset>
      <fieldset className={classes['form-controls']}>
        <legend>
          Tags: <span className={classes.required}>*</span>
        </legend>
        <div className={classes.tags}>
          <Tags setGeneralInfo={setGeneralInfo} />
        </div>
      </fieldset>
      <fieldset className={classes['form-controls']}>
        <legend>
          Companies: <span className={classes.required}>*</span>
        </legend>
        <div className={classes.companies}>
          <Companies setGeneralInfo={setGeneralInfo} />
        </div>
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
      </fieldset>
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
      <div className={classes['form-controls']}>
        <label>
          Description: <span className={classes.required}>*</span>
        </label>
        <Editor value={description} setValue={setDescription}/>
      </div>
    </form>
  );
};

export default ProblemForm;
