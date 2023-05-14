import Image from 'next/image';

type CoinbaseIconProps = {
  width?: number;
  height?: number;
};

const CoinbaseIcon: React.FC<CoinbaseIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/coinbase.png"
      alt="Coinbase Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default CoinbaseIcon;
