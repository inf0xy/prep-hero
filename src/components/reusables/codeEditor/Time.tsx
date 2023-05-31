import { useAppSelector } from '@/hooks/hooks';

type TimeProps = {
  time: number;
};

const Time: React.FC<TimeProps> = ({ time }) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className='flex text-[2rem] font-light'>
      <p>{hours.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{minutes.toString().padStart(2, '0')}</p>
      <p>:</p>
      <p>{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default Time;
