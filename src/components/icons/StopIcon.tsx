import Image from 'next/image';

type StopIconProps = {
  width?: number;
  height?: number;
};

const StopIcon: React.FC<StopIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYklEQVR4nO3YsQnAMAxEUQ2SIbz/AjdW0qe5JoQEvwduDUK/0gwA8AM51vnmGwPc2MDxsYTmZ/+PAYrYQCGhIhIqJFREQoWEikiokFARCRUSKiKh3RKKu9By2NorIQBgnncBai0bLm540xoAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="stop-icon"
    />
  );
};

export default StopIcon;
