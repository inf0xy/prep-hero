import Image from 'next/image';

type VMIconProps = {
  width?: number;
  height?: number;
};

const VMIcon: React.FC<VMIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/vm.png"
      alt="VM Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default VMIcon;
