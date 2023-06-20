import Image from 'next/image';

type FolderAddIconProps = {
  width?: number;
  height?: number;
};

const FolderAddIcon: React.FC<FolderAddIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3SMQrDQAwAQf3/kfmK0gaXBpu9MAPqJVYzAMCzdvfzO3OqdUiMIjWK1ChSo0iNIjW5IntZ6O0Zh1wosrHXuiu30F0OqVGkRpEaRWoUqVGk5m+KAMAc4gtdc51+p0tODQAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="Folder Add Icon"
    />
  );
};

export default FolderAddIcon;
