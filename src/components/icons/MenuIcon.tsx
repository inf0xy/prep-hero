type MenuIconProps = {
  className?: string;
  width?: number;
  height?: number;
};

const MenuIcon: React.FC<MenuIconProps> = ({ className, width, height }) => {
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );
};

export default MenuIcon;
