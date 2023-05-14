import Image from 'next/image';

type YahooIconProps = {
  width?: number;
  height?: number;
};

const YahooIcon: React.FC<YahooIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/yahoo.png"
      alt="Yahoo Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default YahooIcon;