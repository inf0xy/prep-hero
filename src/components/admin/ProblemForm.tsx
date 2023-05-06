import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { validateAddedProblems } from '@/helpers/validateProblemForm';
import { companies as companiesTags } from '@/helpers/formFields';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addProblem, updateProblem } from '@/store';
import { GeneralFormData, Problem, SearchOrForm } from '@/types/dataTypes';
import { NotificationType } from '@/types/dataTypes';
import { formatString } from '@/helpers/formatString';
import classes from './ProblemForm.module.scss';
import Difficulty from './Difficulty';
import Tags from './Tags';
import Companies from './Companies';
import Categories from './Categories';
import TextEditor from '@/components/reusables/TextEditor';
import Alert from '@/components/reusables/Alert';
import Button from '@/components/reusables/Button';
import ListSelection from './ListSelection';


interface AddProblem {
  message: string;
}

type ProblemFormProps = {
  problem?: Problem;
};

const ProblemForm: React.FC<ProblemFormProps> = ({ problem }) => {
  const listNames = problem?.list_names || [];
  const title = problem?.title || '';
  const difficulty = problem?.difficulty || '';
  const category = problem?.category || '';
  const tags = problem?.tags || [];
  const companies = problem?.companies || [];
  const leetcodeLink = problem?.leetcode_link || '';
  const videoLink = problem?.solution_link || '';
  const noteDescription = problem?.description
    ? JSON.parse(problem?.description as string)
    : '';

  const [generalInfo, setGeneralInfo] = useState<SearchOrForm>({
    listNames,
    title,
    difficulty,
    category,
    tags,
    companies,
    leetcodeLink,
    videoLink
  });

  const otherCompanies = generalInfo.companies
    .filter((el) => !companiesTags.includes(el))
    .join(', ')
    .trim();

  const [description, setDescription] = useState(noteDescription);
  const [extraCompanies, setExtraCompanies] = useState(otherCompanies);
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({
    status: undefined,
    message: undefined
  });

  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.problems);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setNotification({
        status: 'error',
        message: error
      });
    } else if (!error && submitted) {
      setShowAlert(true);
      setNotification({
        status: 'success',
        message: 'Success'
      });
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, submitted]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let selectedCompanies = generalInfo.companies.slice();
    if (extraCompanies.trim().length > 0) {
      extraCompanies.split(',').forEach((el) => {
        if (
          selectedCompanies.every(
            (company) => company.toLowerCase() !== el.trim().toLowerCase()
          )
        ) {
          selectedCompanies.push(el !== 'eBay' ? formatString(el.trim()) : el.trim());
        }
      });
    }
    if (
      validateAddedProblems(
        generalInfo as GeneralFormData,
        description,
        selectedCompanies.join(',')
      )
    ) {
      const newProblem = {
        list_names: generalInfo.listNames,
        title: generalInfo.title,
        difficulty: generalInfo.difficulty,
        category: generalInfo.category,
        tags: generalInfo.tags,
        companies: selectedCompanies,
        leetcode_link: generalInfo.leetcodeLink,
        solution_link: generalInfo.videoLink,
        description: JSON.stringify(description)
      };
      if (pathname.includes('/add')) {
        await dispatch(addProblem(newProblem as Problem));
      } else if (pathname.includes('/edit')) {
        await dispatch(updateProblem(newProblem as Problem));
      }
      setSubmitted(true);
    } else {
      setNotification({
        status: 'error',
        message: 'Please fill out all required (*) fields'
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <form
        className={`${classes['problem-form']} ${classes[`problem-form--${theme}`]}`}
        onSubmit={handleSubmit}
      >
        {showAlert && (
          <Alert
            onClose={setShowAlert}
            status={notification.status!}
            setNotification={setNotification}
          >
            {notification.message}
          </Alert>
        )}
        <div className={classes['form-controls']}>
          <label>
            List Name: <span className={classes.required}>*</span>
          </label>
          <div className={classes['list-name']}>
            <ListSelection
              setGeneralInfo={setGeneralInfo}
              currentSelectedListName={generalInfo.listNames as string[]}
            />
          </div>
        </div>
        <div className={classes['form-controls']}>
          <label>
            Title: <span className={classes.required}>*</span>
          </label>
          <input
            className={`${classes.field} ${classes[`field--${theme}`]}`}
            value={generalInfo.title}
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
            <Difficulty
              setGeneralInfo={setGeneralInfo}
              currentSelectedDiffs={generalInfo.difficulty}
            />
          </div>
        </div>
        <fieldset className={classes['form-controls']}>
          <legend>
            Category: <span className={classes.required}>*</span>
          </legend>
          <div className={`${classes.category} ${classes[`category--${theme}`]}`}>
            <Categories
              setGeneralInfo={setGeneralInfo}
              currentSelectedCategory={generalInfo.category}
            />
          </div>
        </fieldset>
        <fieldset className={classes['form-controls']}>
          <legend>
            Tags: <span className={classes.required}>*</span>
          </legend>
          <div className={`${classes.tags} ${classes[`tags--${theme}`]}`}>
            <Tags
              setGeneralInfo={setGeneralInfo}
              currentSelectedTags={generalInfo.tags}
            />
          </div>
        </fieldset>
        <fieldset className={classes['form-controls']}>
          <legend>
            Companies: <span className={classes.required}>*</span>
          </legend>
          <div className={`${classes.companies} ${classes[`companies--${theme}`]}`}>
            <Companies
              setGeneralInfo={setGeneralInfo}
              currentSelectedCompanies={generalInfo.companies}
            />
          </div>
          <div className="flex items-center space-x-5">
            <input
              value={extraCompanies}
              onChange={(e) => setExtraCompanies(e.target.value)}
              className={`${classes.field} ${classes[`field--${theme}`]} ${classes['added-companies']}`}
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
            className={`${classes.field} ${classes[`field--${theme}`]}`}
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
            className={`${classes.field} ${classes[`field--${theme}`]}`}
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
      </form>
      <div className={classes['form-actions']}>
        <Button
          color='gray'
          className="self-center"
          extraStyle={{ padding: '1rem 4.6rem' }}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button className="self-center" extraStyle={{ padding: '1rem 4rem' }} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ProblemForm;
