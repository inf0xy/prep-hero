import Image from 'next/image';

type HuaweiIconProps = {
  width?: number;
  height?: number;
};

const HuaweiIcon: React.FC<HuaweiIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/huawei.png"
      alt="Huawei Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default HuaweiIcon;
