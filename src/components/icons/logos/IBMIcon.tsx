import Image from 'next/image';

type IBMIconProps = {
  width?: number;
  height?: number;
};

const IBMIcon: React.FC<IBMIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/ibm.png"
      alt="IBM Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default IBMIcon;
