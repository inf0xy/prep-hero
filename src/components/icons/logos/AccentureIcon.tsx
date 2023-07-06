import Image from 'next/image';

type AccentureIconProps = {
  width?: number;
  height?: number;
};

const AccentureIcon: React.FC<AccentureIconProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
      }}
    >
      <Image
        alt="Accenture Icon"
        src="/accenture.png"
        fill={true}
        sizes={`${width}px`}
      />
    </div>
  );
};

export default AccentureIcon;
