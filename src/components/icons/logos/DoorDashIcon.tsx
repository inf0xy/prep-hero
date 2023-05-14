import Image from 'next/image';

type DoorDashIconProps = {
  width?: number;
  height?: number;
};

const DoorDashIcon: React.FC<DoorDashIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/doordash.png"
      alt="DoorDash Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default DoorDashIcon;
