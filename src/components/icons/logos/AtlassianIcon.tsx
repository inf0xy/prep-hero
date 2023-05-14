import Image from 'next/image';

type AtlassianIconProps = {
  width?: number;
  height?: number;
};

const AtlassianIcon: React.FC<AtlassianIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/atlassian.png"
      alt="Atlassian Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AtlassianIcon;
