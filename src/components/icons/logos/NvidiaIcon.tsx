import Image from 'next/image';

type NvidiaIconProps = {
  width?: number;
  height?: number;
};

const NvidiaIcon: React.FC<NvidiaIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/nvidia.png"
      alt="Nvidia Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default NvidiaIcon;
