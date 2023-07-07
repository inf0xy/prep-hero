import Image from 'next/image';

type eBayIconProps = {
  width?: number;
  height?: number;
};

const eBayIcon: React.FC<eBayIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/ebay.png"
      alt="eBay Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default eBayIcon;
