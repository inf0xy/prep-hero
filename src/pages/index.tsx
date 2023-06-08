import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>

    </div>
  );
};

export default HomePage;
