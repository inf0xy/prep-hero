import Image from 'next/image';

type SamsungIconProps = {
  width?: number;
  height?: number;
};

const SamsungIcon: React.FC<SamsungIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/samsung.png"
      alt="Samsung Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default SamsungIcon;
