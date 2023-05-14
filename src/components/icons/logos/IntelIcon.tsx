import Image from 'next/image';

type IntelIconProps = {
  width?: number;
  height?: number;
};

const IntelIcon: React.FC<IntelIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/intel.png"
      alt="Intel Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default IntelIcon;
