import Image from 'next/image';

type AirBnBIconProps = {
  width?: number;
  height?: number;
};

const AirBnBIcon: React.FC<AirBnBIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/airbnb.png"
      alt="AirBnB Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AirBnBIcon;

