import Image from 'next/image';

type JPMorganIconProps = {
  width?: number;
  height?: number;
};

const JPMorganIcon: React.FC<JPMorganIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/jpmorgan.png"
      alt="JP Morgan Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default JPMorganIcon;
