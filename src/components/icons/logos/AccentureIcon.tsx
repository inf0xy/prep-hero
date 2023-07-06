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
      // width={width ? width : 15}
      width="11"
      // height={height ? height : 15}
      height="11"
    />
  );
};

export default AccentureIcon;
