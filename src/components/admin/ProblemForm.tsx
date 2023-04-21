import { useState, useRef, FormEvent } from 'react';
import classes from './ProblemForm.module.css';
import Difficulty from './Difficulty';
import Tags from './Tags';
import Companies from './Companies';
import Categories from './Categories';
import TextEditor from '@/components/TextEditor';
import Alert from '../Alert';
import Button from '../Button';
import ListName from './ListName';
import { validateAddedProblems } from '@/helpers/validateProblemForm';

type GeneralFormData = {
  listName: string;
  title: string;
  difficulty: string;
  category: string;
  tags: string[];
  companies: string[];
  leetcodeLink: string;
  videoLink: string;
};

type NotificationType = {
  status: 'success' | 'error' | 'warning' | undefined;
  message: string | undefined;
};

const formatString = (text: string) => {
  return text.replace(/\b\w/g, (match) => match.toUpperCase());
};

const ProblemForm = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralFormData>({
    listName: '',
    title: '',
    difficulty: '',
    category: '',
    tags: [],
    companies: [],
    leetcodeLink: '',
    videoLink: ''
  });
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({
    status: undefined,
    message: undefined
  });
  const companyInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const companyInput = companyInputRef.current?.value;
    let selectedCompanies = generalInfo.companies.slice();
    if (companyInput && companyInput.trim().length > 0) {
      companyInput.split(',').forEach((el) => {
        if (
          selectedCompanies.every(
            (company) => company.toLowerCase() !== el.trim().toLowerCase()
          )
        ) {
          selectedCompanies.push(formatString(el.trim()));
        }
      });
    }

    if (
      validateAddedProblems(
        generalInfo,
        description,
        selectedCompanies.join(',')
      )
    ) {
      // TODO; SUBMIT FORM
    } else {
      setNotification({
        status: 'error',
        message: 'Please fill out all required (*) fields'
      });
      setShowAlert(true);
    }
  };

  return (
    <form className={classes['problem-form-container']} onSubmit={handleSubmit}>
      {showAlert && (
        <Alert onClose={setShowAlert} status={notification.status!}>
          {notification.message}
        </Alert>
      )}
      <div className={classes['form-controls']}>
        <label>
          List Name: <span className={classes.required}>*</span>
        </label>
        <div className={classes['list-name']}>
          <input
            className={classes.field}
            onChange={(e) =>
              setGeneralInfo((prev) => ({ ...prev, listName: e.target.value }))
            }
          />
          <ListName setGeneralInfo={setGeneralInfo} />
        </div>
      </div>
      <div className={classes['form-controls']}>
        <label>
          Title: <span className={classes.required}>*</span>
        </label>
        <input
          className={classes.field}
          onChange={(e) =>
            setGeneralInfo((prev) => ({ ...prev, title: e.target.value }))
          }
        />
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
          ref={companyInputRef}
          className={`${classes.field} ${classes['added-companies']}`}
          placeholder="Google, Facebook, ..."
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
        <TextEditor
          value={description}
          setValue={setDescription}
          className={classes.description}
        />
      </div>
      <Button className="self-center" extraStyle={{padding: '1rem 6rem'}}>Submit</Button>
    </form>
  );
};

export default ProblemForm;
