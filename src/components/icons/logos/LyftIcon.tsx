import Image from 'next/image';

type LyftIconProps = {
  width?: number;
  height?: number;
};

const LyftIcon: React.FC<LyftIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/lyft.png"
      alt="Lyft Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default LyftIcon;
