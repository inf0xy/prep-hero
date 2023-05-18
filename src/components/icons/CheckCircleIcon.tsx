import Image from 'next/image';

type CheckCircleIconProps = {
  width?: number;
  height?: number;
};

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,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"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default CheckCircleIcon;
