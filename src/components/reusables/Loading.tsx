import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';
import classes from './Loading.module.scss';

type LoadingProsp = {
  height?: number;
  width?: number;
  className?: string;
};

const Loading: React.FC<LoadingProsp> = ({ height, width, className }) => {
  const { theme } = useAppSelector(state => state.theme);

  return (
    <div
      className={`${classes.loading} ${classes[`loading--${theme}`]}`}
    >
      <div className={`${classes['loading-image']} ${className}`}>
        <Image
          src="/prep-hero-icon.svg"
          alt="Prep Hero Icon"
          width={width ? width : 50}
          height={height ? height : 50}
        />
      </div>
    </div>
  );
};

export default Loading;
