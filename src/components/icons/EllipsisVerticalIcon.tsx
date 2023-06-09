type EllipsisVerticalIconProps = {
  className?: string;
  width?: string;
  height?: string;
};

const EllipsisVerticalIcon: React.FC<EllipsisVerticalIconProps> = ({
  className,
  width,
  height
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className} w-${width ? width : '6'} h-${
        height ? height : '6'
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  );
};

export default EllipsisVerticalIcon;
