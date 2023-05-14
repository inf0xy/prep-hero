import Image from 'next/image';

type AmericanExpressIconProps = {
  width?: number;
  height?: number;
};

const AmericanExpressIcon: React.FC<AmericanExpressIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/american-express.png"
      alt="American Express Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AmericanExpressIcon;
