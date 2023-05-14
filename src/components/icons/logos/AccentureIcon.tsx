import Image from 'next/image';

type AccentureIconProps = {
  width?: number;
  height?: number;
};

const AccentureIcon: React.FC<AccentureIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/accenture.png"
      alt="Accenture Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AccentureIcon;
