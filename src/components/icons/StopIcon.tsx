import Image from 'next/image';

type StopIconProps = {
  width?: number;
  height?: number;
};

const StopIcon: React.FC<StopIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAmklEQVR4nO3aWw3DQAwEQINZLscfg4FsIbQ/aaJ2RgqAWPdYWzcDAADwgc3pk7+52j7gJxUgVkAfswXmZgoQK6C2QJwBdQjGLVDXYOSA/l7weEMOiBxQOSByQOWAyAGVAyIHdK62gtCRBFcUPnqB1Qwd3eBqh495wNzMPCDmATUPiHlAzQPiiUy9EYpHUv168Nh/KwAAADC/4AUheS2MYREErgAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default StopIcon;
