import Image from 'next/image';

type RedditIconProps = {
  width?: number;
  height?: number;
};

const RedditIcon: React.FC<RedditIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/reddit.png"
      alt="Reddit Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default RedditIcon;
