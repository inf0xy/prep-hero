import Image from 'next/image';

type SortIconLightProps = {
  width: number;
  height: number;
};

const SortIconLight: React.FC<SortIconLightProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAsUlEQVR4nO3WTQoCMQwF4F5C0RMp09CSQG7ruFZ05cbjKBV05zj5aVHpg0B336ZtXgg93xxEXCagc5lyboLylhcJ6JKBbo+JeMUNrtui0ADnd2hNnD+hNXCei3riLEU9cNaiVjwBHdXoa/AghnOk0QqniDsx3PP/yYB7862ONP7Oc2KHD2QYeCWGrV+mGrUsCTOqWYtuqKQIuKNzqk81dKrsVUefKZU2RzyVaVZve4Iyd98duDueO+gSAAAAAElFTkSuQmCC"
      width={width}
      height={height}
      alt="sort-icon"
    />
  );
};

export default SortIconLight;
