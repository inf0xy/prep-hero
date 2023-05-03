import ProblemForm from '@/components/admin/ProblemForm';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/AdminProblem.module.scss';

const AddProblemPage = () => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div
      className={`${classes['problems-page']} ${
        classes[`problems-page--${theme}`]
      }`}
    >
      <ProblemForm />
    </div>
  );
};
export default AddProblemPage;
