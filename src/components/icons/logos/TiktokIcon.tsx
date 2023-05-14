import Image from 'next/image';

type TiktokIconProps = {
  width?: number;
  height?: number;
};

const TiktokIcon: React.FC<TiktokIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/tiktok.png"
      alt="Tiktok Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default TiktokIcon;
