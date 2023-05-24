import ProblemForm from '@/components/admin/ProblemForm';
import { useAppSelector } from '@/hooks/hooks';
import { Problem } from '@/types/dataTypes';
import classes from '../../styles/AdminProblem.module.scss';

const EditProblemPage = () => {
  const { theme, selectedProblem } = useAppSelector((state) => {
    const { selectedProblem } = state.problems;
    const { theme } = state.theme;
    return { theme, selectedProblem };
  });
  return (
    <div
      className={`${classes['problems-page']} ${
        classes[`problems-page--${theme}`]
      }`}
    >
      <ProblemForm problem={selectedProblem as Problem} />
    </div>
  );
};
export default EditProblemPage;
