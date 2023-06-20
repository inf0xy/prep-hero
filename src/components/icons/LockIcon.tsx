type BookmarOutlineProps = {
  width?: number;
  height?: number;
  className?: string;
};

const LockIcon: React.FC<BookmarOutlineProps> = ({
  width,
  height,
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 256 256"
      className={`w-${width ? width : '6'} h-${
        height ? height : '6'
      } ${className}`}
      style={{ fill: '#000000' }}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: 'normal' }}
      >
        <g transform="scale(5.33333,5.33333)">
          <path
            d="M24,4c-5.5,0 -10,4.5 -10,10v4h4v-4c0,-3.3 2.7,-6 6,-6c3.3,0 6,2.7 6,6v4h4v-4c0,-5.5 -4.5,-10 -10,-10z"
            fill="#c4c4c4"
          ></path>
          <path
            d="M36,44h-24c-2.2,0 -4,-1.8 -4,-4v-18c0,-2.2 1.8,-4 4,-4h24c2.2,0 4,1.8 4,4v18c0,2.2 -1.8,4 -4,4z"
            fill="#eea60c"
          ></path>
          <path
            d="M24,28c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"
            fill="#c4c4c4"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default LockIcon;
