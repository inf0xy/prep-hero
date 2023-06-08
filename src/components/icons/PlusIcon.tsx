import Image from 'next/image';

type PlusIconProps = {
  width?: number;
  height?: number;
};

const PlusIcon: React.FC<PlusIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAX0lEQVR4nO3SMQqAQAwAwRQ+1f9/4WzFUlBWmYH0CZsZAOBZa9/WeearlkNiFKlRpEaRGkVqFKnJFVmXhd6ecciFInvste7KLXSXQ2oUqVGkRpEaRWoUqflNEQCYjzgAzg0/v4QezmcAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default PlusIcon;
