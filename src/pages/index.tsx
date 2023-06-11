import { useAppSelector } from '@/hooks/hooks';
import Debugger from '@/components/reusables/codeEditor/Debugger';
import classes from '@/styles/HomePage.module.scss';

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>
      <Debugger />
    </div>
  );
};

export default HomePage;
