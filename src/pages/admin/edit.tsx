import ProblemForm from '@/components/admin/ProblemForm';
import { useAppSelector } from '@/hooks/hooks';
import classes from '../../styles/AdminProblem.module.css';

const EditProblemPage = () => {
  const { selectedProblem } = useAppSelector((state) => state.problems);
  return (
    <div className={classes['problems-page']}>
      <ProblemForm problem={selectedProblem} />
    </div>
  );
};
export default EditProblemPage;
