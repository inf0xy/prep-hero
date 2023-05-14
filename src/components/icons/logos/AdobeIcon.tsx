import Image from 'next/image';

type AdobeIconProps = {
  width?: number;
  height?: number;
};

const AdobeIcon: React.FC<AdobeIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/adobe.png"
      alt="Adobe Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AdobeIcon;

