import Image from 'next/image';

type CiscoIconProps = {
  width?: number;
  height?: number;
};

const CiscoIcon: React.FC<CiscoIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/cisco.png"
      alt="Cisco Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default CiscoIcon;
