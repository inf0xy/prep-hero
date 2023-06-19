import Image from 'next/image';

type LoadingInfinityIconProps = {
  width?: number;
  height?: number;
};

const LoadingInfinityIcon: React.FC<LoadingInfinityIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/loading-infinity.gif"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default LoadingInfinityIcon;
