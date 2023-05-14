import Image from 'next/image';

type MetaIconProps = {
  width?: number;
  height?: number;
};

const MetaIcon: React.FC<MetaIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/meta.png"
      alt="Meta Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default MetaIcon;
