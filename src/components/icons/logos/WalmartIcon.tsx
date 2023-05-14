import Image from 'next/image';

type WalmartIconProps = {
  width?: number;
  height?: number;
};

const WalmartIcon: React.FC<WalmartIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/walmart.png"
      alt="Walmart Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default WalmartIcon;
