import Image from 'next/image';

type UberIconProps = {
  width?: number;
  height?: number;
};

const UberIcon: React.FC<UberIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/uber.png"
      alt="Uber Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default UberIcon;
