import Image from 'next/image';

type TwitchIconProps = {
  width?: number;
  height?: number;
};

const TwitchIcon: React.FC<TwitchIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/twitch.png"
      alt="Twitch Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default TwitchIcon;
