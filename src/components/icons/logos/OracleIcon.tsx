import Image from 'next/image';

type OracleIconProps = {
  width?: number;
  height?: number;
};

const OracleIcon: React.FC<OracleIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/oracle.png"
      alt="Oracle Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default OracleIcon;
