import Image from 'next/image';
import classes from './SmallLoading.module.scss';

type SmallLoadingProsp = {
  height?: number;
  width?: number;
  className?: string;
};

const SmallLoading: React.FC<SmallLoadingProsp> = ({
  height,
  width,
  className
}) => {
  return (
    <div className={`${classes['small-loading']} ${className}`}>
      <Image
        src="/prep-hero-icon.svg"
        alt="Prep Hero Icon"
        width={width ? width : 50}
        height={height ? height : 50}
      />
    </div>
  );
};

export default SmallLoading;
