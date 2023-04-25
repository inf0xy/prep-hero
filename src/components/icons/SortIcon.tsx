import Image from 'next/image';

type SortIconProps = {
  width: number;
  height: number;
};

const SortIcon: React.FC<SortIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApUlEQVR4nO3WQQrCMBCF4VyiUu9/Deu6oisXkfkJ5CiVgF2qTWYSquTBQHbfJsk853r2nBDCQURuadK5CQoMwB1YXvPw3h9bo0t1nPdoPZzvqD3OdtQOJx/V45SjOhy4KNB15hJ4MoBP2XDP/0dEzgaXa/qp5zRoP5AY45gNa7/MYlSzJNRoyVo0Q3OKgDm6pfpUQz+VveromlRpgWuaZvW2xxXmCSJfTImcTdxLAAAAAElFTkSuQmCC"
      width={width}
      height={height}
      alt="sort-icon"
    />
  );
};

export default SortIcon;
