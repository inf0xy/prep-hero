import { useAppSelector } from '@/hooks/hooks';
import variables from '@/styles/variables.module.scss';

const Time = () => {
  const { duration, theme } = useAppSelector((state) => {
    const { duration } = state.user;
    const { theme } = state.theme;
    return { duration, theme };
  });

  const hours = Math.floor(duration! / 3600);
  const minutes = Math.floor((duration! % 3600) / 60);
  const seconds = duration! % 60;

  return (
    <div
      className="flex text-[2rem] font-light"
      style={{ color: theme === 'dark' ? variables.colorGray200 : variables.colorGray700 }}
    >
      <p>{hours.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{minutes.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default Time;
