type PlusIconProps = {
  className?: string;
  width?: number;
  height?: number;
  extraStyle?: object;
};

const PlusIcon: React.FC<PlusIconProps> = ({
  className,
  width,
  height,
  extraStyle
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-${width ? width : '6'} h-${
        height ? height : '6'
      } ${className}`}
      style={extraStyle}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default PlusIcon;
