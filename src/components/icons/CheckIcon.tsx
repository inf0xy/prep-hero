type CheckIconType = { width: string, height: string };

const CheckIcon: React.FC<CheckIconType> = ({ width, height }) => {
  return (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width={width}
  height={height}
  viewBox="0,0,256,256"
>
  <g
    fillOpacity={0}
    fill="#dddddd"
    fillRule="nonzero"
    stroke="none"
    strokeWidth={1}
    strokeLinecap="butt"
    strokeLinejoin="miter"
    strokeMiterlimit={10}
    strokeDasharray=""
    strokeDashoffset={0}
    fontFamily="none"
    fontWeight="none"
    fontSize="none"
    textAnchor="none"
  >
    <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
  </g>
  <g
    fill="#2FC572"
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
  >
    <g transform="scale(10.66667,10.66667)">
      <path d="M12,2c-5.514,0 -10,4.486 -10,10c0,5.514 4.486,10 10,10c5.514,0 10,-4.486 10,-10c0,-1.126 -0.19602,-2.2058 -0.54102,-3.2168l-1.61914,1.61914c0.105,0.516 0.16016,1.05066 0.16016,1.59766c0,4.411 -3.589,8 -8,8c-4.411,0 -8,-3.589 -8,-8c0,-4.411 3.589,-8 8,-8c1.633,0 3.15192,0.49389 4.41992,1.33789l1.43164,-1.43164c-1.648,-1.194 -3.66656,-1.90625 -5.85156,-1.90625zM21.29297,3.29297l-10.29297,10.29297l-3.29297,-3.29297l-1.41406,1.41406l4.70703,4.70703l11.70703,-11.70703z"></path>
    </g>
  </g>
</svg>
  )
};

export default CheckIcon;