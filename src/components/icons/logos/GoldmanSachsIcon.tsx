import Image from 'next/image';

type GoldmanSachsIconProps = {
  width?: number;
  height?: number;
};

const GoldmanSachsIcon: React.FC<GoldmanSachsIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/goldman-sachs.png"
      alt="Goldman Sachs Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default GoldmanSachsIcon;
