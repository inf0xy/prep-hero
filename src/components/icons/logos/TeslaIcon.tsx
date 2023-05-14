import Image from 'next/image';

type TeslaIconProps = {
  width?: number;
  height?: number;
};

const TeslaIcon: React.FC<TeslaIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/tesla.png"
      alt="Tesla Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default TeslaIcon;
