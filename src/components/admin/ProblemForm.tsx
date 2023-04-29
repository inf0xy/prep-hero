import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from './ProblemForm.module.css';
import Difficulty from './Difficulty';
import Tags from './Tags';
import Companies from './Companies';
import Categories from './Categories';
import TextEditor from '@/components/reusables/TextEditor';
import Alert from '@/components/reusables/Alert';
import Button from '@/components/reusables/Button';
import ListName from './ListName';
import { validateAddedProblems } from '@/helpers/validateProblemForm';
import { GeneralFormData } from '@/types/dataTypes';
import { NotificationType } from '@/types/dataTypes';
import { formatString } from '@/helpers/formatString';


interface AddProblem {
  message: string;
}

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
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
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
      try {
        const { data } = await axios.post<AddProblem>('/api/problems/new', {
          list_name: generalInfo.listName,
          title: generalInfo.title,
          difficulty: generalInfo.difficulty,
          category: generalInfo.category,
          tags: generalInfo.tags,
          companies: selectedCompanies,
          leetcode_link: generalInfo.leetcodeLink,
          solution_link: generalInfo.videoLink,
          description: JSON.stringify(description)
        });
        setNotification({
          status: 'success',
          message: data.message
        });
        setShowAlert(true);
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } catch (err: any) {
        setNotification({
          status: 'error',
          message: err.response.data.message
        });
        setShowAlert(true);
      }
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
        <Alert onClose={setShowAlert} status={notification.status!} setNotification={setNotification}>
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
            value={generalInfo.listName}
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
        <div className="flex items-center space-x-5">
          <input
            ref={companyInputRef}
            className={`${classes.field} ${classes['added-companies']}`}
            placeholder="Google, Facebook,..."
          />
          <p className="pt-4 italic">** If not listed above</p>
        </div>
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
          Solution link: <span className={classes.required}>*</span>
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
          defaultMode={true}
          value={description}
          setValue={setDescription}
          className={classes.description}
        />
      </div>
      <Button className="self-center" extraStyle={{ padding: '1rem 6rem' }}>
        Submit
      </Button>
    </form>
  );
};

export default ProblemForm;
