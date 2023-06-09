type FolderOpenIconProps = {
  width?: number;
  height?: number;
};

const FolderOpenIcon: React.FC<FolderOpenIconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width ? `${width}` : '48'}
      height={height ? `${height}` : '48'}
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="xGIh33lbYX9pWIYWeZsuka_zRCxfHhAkOiL_gr1"
        x1="24"
        x2="24"
        y1="6.955"
        y2="23.167"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#eba600"></stop>
        <stop offset="1" stopColor="#c28200"></stop>
      </linearGradient>
      <path
        fill="url(#xGIh33lbYX9pWIYWeZsuka_zRCxfHhAkOiL_gr1)"
        d="M24.414,10.414l-2.536-2.536C21.316,7.316,20.553,7,19.757,7H5C3.895,7,3,7.895,3,9v30	c0,1.105,0.895,2,2,2h38c1.105,0,2-0.895,2-2V13c0-1.105-0.895-2-2-2H25.828C25.298,11,24.789,10.789,24.414,10.414z"
      ></path>
      <linearGradient
        id="xGIh33lbYX9pWIYWeZsukb_zRCxfHhAkOiL_gr2"
        x1="24.066"
        x2="24.066"
        y1="19.228"
        y2="33.821"
        gradientTransform="matrix(-1 0 0 1 48 0)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ffd869"></stop>
        <stop offset="1" stopColor="#fec52b"></stop>
      </linearGradient>
      <path
        fill="url(#xGIh33lbYX9pWIYWeZsukb_zRCxfHhAkOiL_gr2)"
        d="M24,23l3.854-3.854C27.947,19.053,28.074,19,28.207,19H44.81c1.176,0,2.098,1.01,1.992,2.181	l-1.636,18C45.072,40.211,44.208,41,43.174,41H4.79c-1.019,0-1.875-0.766-1.988-1.779L1.062,23.555C1.029,23.259,1.261,23,1.559,23	H24z"
      ></path>
    </svg>
  );
};

export default FolderOpenIcon;
