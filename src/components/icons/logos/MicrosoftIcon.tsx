import Image from 'next/image';

type MicrosoftIconProps = {
  width?: number;
  height?: number;
};

const MicrosoftIcon: React.FC<MicrosoftIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/microsoft.png"
      alt="Microsoft Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default MicrosoftIcon;
