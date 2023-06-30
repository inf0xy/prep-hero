import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type SortIconProps = {
  width: number;
  height: number;
};

const SortIcon: React.FC<SortIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nO3WQQrCMBCF4VyiUu9/Deu6oisXkfkJ5CiVgF2qTWYSquTBQHbfJsk853r2nBDCQURuadK5CQoMwB1YXvPw3h9bo0t1nPdoPZzvqD3OdtQOJx/V45SjOhy4KNB15hJ4MoBP2XDP/0dEzgaXa/qp5zRoP5AY45gNa7/MYlSzJNRoyVo0Q3OKgDm6pfpUQz+VveromlRpgWuaZvW2xxXmCSJfTImcTdxLAAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAsUlEQVR4nO3WTQoCMQwF4F5C0RMp09CSQG7ruFZ05cbjKBV05zj5aVHpg0B336ZtXgg93xxEXCagc5lyboLylhcJ6JKBbo+JeMUNrtui0ADnd2hNnD+hNXCei3riLEU9cNaiVjwBHdXoa/AghnOk0QqniDsx3PP/yYB7862ONP7Oc2KHD2QYeCWGrV+mGrUsCTOqWYtuqKQIuKNzqk81dKrsVUefKZU2RzyVaVZve4Iyd98duDueO+gSAAAAAElFTkSuQmCC'
      }
      width={width}
      height={height}
      alt="sort-icon"
    />
  );
};

export default SortIcon;
