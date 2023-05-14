import Image from 'next/image';

type VisaIconProps = {
  width?: number;
  height?: number;
};

const VisaIcon: React.FC<VisaIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/visa.png"
      alt="Visa Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default VisaIcon;
