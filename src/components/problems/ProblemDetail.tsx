import { Problem, Submission } from '@/types/dataTypes';
import { useAppSelector } from '@/hooks/hooks';
import { problemDetailStyle } from '@/helpers/extraStyles';
import EditorPreview from '../reusables/EditorPreview';
import LogoList from './LogoList';
import CheckIcon from '../icons/CheckIcon';
import classes from './ProblemDetail.module.scss';

type ProblemDetailProps = {
  problem: Problem;
  tab: string;
};

const defaultProps = { tab: 'prompt' };

const ProblemDetail: React.FC<ProblemDetailProps> = ({ tab, problem }) => {
  const { title, difficulty, category, companies, description, solution_link } =
    problem;
  const { theme, submissions } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions } = state.user;
    return { theme, submissions };
  });

  const completed = submissions.some(
    (el: Submission) => el.title === title && el.accepted === true
  );

  const videoURL =
    'https://www.youtube.com/embed/' + solution_link?.split('=')[1];

  return (
    <>
      {tab === 'prompt' ? (
        <div className={classes['problem-detail']}>
          <h1>{title}</h1>
          <div className={classes['general-info']}>
            <span className={classes[`${difficulty?.toLowerCase()}`]}>
              {difficulty}
            </span>
            <span className={classes.category}>{category}</span>
            {completed && (
              <span className="absolute left-[20rem] top-[-0.4rem]">
                <CheckIcon width="20" height="20" />
              </span>
            )}
          </div>
          <div className={classes.companies}>
            <LogoList companyNames={companies!} />
          </div>
          <EditorPreview
            value={JSON.parse(description!)}
            extraStyle={problemDetailStyle[theme]}
          />
        </div>
      ) : (
        <div className={classes.solution}>
          <div className={classes.video}>
            <iframe src={videoURL} allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
};

ProblemDetail.defaultProps = defaultProps;

export default ProblemDetail;
