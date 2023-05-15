import { Problem } from '@/types/dataTypes';
import EditorPreview from '../reusables/EditorPreview';
import { problemDetailStyle } from '@/helpers/extraStyles';
import classes from './ProblemDetail.module.scss';
import LogoList from './LogoList';
import { useAppSelector } from '@/hooks/hooks';

type ProblemDetailProps = {
  problem: Problem;
  tab: string;
};

const defaultProps = { tab: 'prompt' };

const ProblemDetail: React.FC<ProblemDetailProps> = ({ tab, problem }) => {
  const { title, difficulty, category, companies, description, solution_link } =
    problem;
  const { theme } = useAppSelector((state) => state.theme);

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
