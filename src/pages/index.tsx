import CodeSnippet from '@/components/reusables/CodeSnippet';
import SpeedChart from '@/components/dashboard/SpeedChart';
import { getScrollbarStyles } from '@/helpers/extraStyles';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`} style={getScrollbarStyles(theme)}>
      <SpeedChart />
    </div>
  );
};

export default HomePage;
