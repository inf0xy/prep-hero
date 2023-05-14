import { Problem } from "@/types/dataTypes";
import EditorPreview from "../reusables/EditorPreview";
import classes from './ProblemDetail.module.scss';

type ProblemDetailProps = {
  problem: Problem;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem }) => {
  const { difficulty, companies, description } = problem;
  return <div className={classes['problem-detail']}>
    <EditorPreview value={JSON.parse(description!)}/>
  </div>
};

export default ProblemDetail;