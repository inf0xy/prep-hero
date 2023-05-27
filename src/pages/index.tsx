import CodeSnippet from '@/components/reusables/CodeSnippet';
import HeatMapCalendar from '@/components/user/HeatMapCalendar';
import ProgressBar from '@/components/user/ProgressBar';
import ProgressCircle from '@/components/user/ProgressCircle';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

export const data = {
  '2023-05-01': 2,
  '2023-05-02': 5,
  '2023-05-03': 6,
  '2023-05-04': 8,
  '2023-05-05': 10,
  '2023-05-06': 12,
  '2023-05-07': 14,
  '2023-05-08': 16,
  '2023-05-09': 18,
  '2023-05-10': 20,
  '2023-05-11': 22,
  '2023-05-12': 24,
  '2023-05-13': 26,
  '2023-05-14': 28,
  '2023-05-15': 30,
  '2023-05-16': 32,
  '2023-05-17': 34,
  '2023-05-18': 36,
  '2023-05-19': 38,
  '2023-05-20': 40,
  '2023-05-21': 42,
  '2023-05-22': 44,
  '2023-05-23': 46,
  '2023-05-24': 48,
  '2023-05-25': 50,
  '2023-05-26': 52,
  '2023-05-27': 54,
  '2023-05-28': 56,
  '2023-05-29': 58,
  '2023-05-30': 60,
  '2023-05-31': 62
};

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>
      <HeatMapCalendar />
      <div className='flex ml-8 mt-8 bg-[#303030] shadow-lg w-fit pl-10 pr-16 py-6 rounded-lg overflow-hidden'>
        <ProgressCircle />
        <ProgressBar />
      </div>
    </div>
  );
};

export default HomePage;
