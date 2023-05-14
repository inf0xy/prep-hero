import Image from 'next/image';

type TwitterIconProps = {
  width?: number;
  height?: number;
};

const TwitterIcon: React.FC<TwitterIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/twitter.png"
      alt="Twitter Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default TwitterIcon;
