import Image from 'next/image';

type AmazonIconProps = {
  width?: number;
  height?: number;
};

const AmazonIcon: React.FC<AmazonIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/amazon.svg"
      alt="Amazon Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AmazonIcon;
