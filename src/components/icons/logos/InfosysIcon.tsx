import Image from 'next/image';

type InfosysIconProps = {
  width?: number;
  height?: number;
};

const InfosysIcon: React.FC<InfosysIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/infosys.png"
      alt="Infosys Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default InfosysIcon;
