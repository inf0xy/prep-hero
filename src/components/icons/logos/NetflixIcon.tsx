import Image from 'next/image';

type NetflixIconProps = {
  width?: number;
  height?: number;
};

const NetflixIcon: React.FC<NetflixIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/netflix.png"
      alt="Netflix Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default NetflixIcon;
