import ProblemForm from '@/components/admin/ProblemForm';
import classes from '../../styles/AdminAddProblem.module.css';

const AddProblemPage = () => {
  return (
    <div className={classes['add-problems-page']}>
      <ProblemForm />
    </div>
  );
};
export default AddProblemPage;
