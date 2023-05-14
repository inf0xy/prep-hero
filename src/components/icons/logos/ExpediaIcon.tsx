import Image from 'next/image';

type ExpediaIconProps = {
  width?: number;
  height?: number;
};

const ExpediaIcon: React.FC<ExpediaIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/expedia.png"
      alt="Expedia Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default ExpediaIcon;
