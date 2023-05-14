import Image from 'next/image';

type LinkedInIconProps = {
  width?: number;
  height?: number;
};

const LinkedInIcon: React.FC<LinkedInIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/linkedin.png"
      alt="LinkedIn Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default LinkedInIcon;
