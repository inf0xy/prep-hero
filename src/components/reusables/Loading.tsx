import Image from 'next/image';
import classes from './Loading.module.scss';

type LoadingProsp = {
  height?: number;
  width?: number;
  className?: string;
};

const Loading: React.FC<LoadingProsp> = ({ height, width, className }) => {
  return (
    <div className={`${classes.loading} ${className}`}>
      <Image
        src="/prep-hero-icon.svg"
        alt="Prep Hero Icon"
        width={width ? width : 50}
        height={height ? height : 50}
      />
    </div>
  );
};

export default Loading;
