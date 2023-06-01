import { useAppSelector } from '@/hooks/hooks';

const Time = () => {
  const { theme, duration } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { duration } = state.user;
    return { theme, duration };
  });

  const hours = Math.floor(duration! / 3600);
  const minutes = Math.floor((duration! % 3600) / 60);
  const seconds = duration! % 60;

  return (
    <div className="flex text-[2rem] font-light">
      <p>{hours.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{minutes.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default Time;
