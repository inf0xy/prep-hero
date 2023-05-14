import Image from 'next/image';

type BloombergIconProps = {
  width?: number;
  height?: number;
};

const BloombergIcon: React.FC<BloombergIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/bloomberg.png"
      alt="Bloomberg Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default BloombergIcon;
