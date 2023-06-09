import Image from 'next/image';

type PlusIconProps = {
  width?: number;
  height?: number;
};

const PlusIcon: React.FC<PlusIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYUlEQVR4nO3SMQrDQAwAQf3/mwFX94ekNVcaHNZmBtRLrGYAgHut4/M9zzzVckiMIjWK1ChSo0iNIjW5Imtb6N8zDtkocsRe66rcQlc5pEaRGkVqFKlRpEaRmtcUAYB5iB89GXjuHsx5pQAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default PlusIcon;
