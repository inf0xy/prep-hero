import ProblemForm from '@/components/admin/ProblemForm';
import classes from '../../styles/AdminProblem.module.css';

const AddProblemPage = () => {
  return (
    <div className={classes['problems-page']}>
      <ProblemForm />
    </div>
  );
};
export default AddProblemPage;
