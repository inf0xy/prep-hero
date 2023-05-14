import Image from 'next/image';

type SpotifyIconProps = {
  width?: number;
  height?: number;
};

const SpotifyIcon: React.FC<SpotifyIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/spotify.png"
      alt="Spotify Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default SpotifyIcon;
