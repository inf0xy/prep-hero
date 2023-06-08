import Image from 'next/image';

type ListIconProps = {
  width?: number;
  height?: number;
};

const ListIcon: React.FC<ListIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoklEQVR4nO2WsRGEMAwEXQANQBu0AK1QxM27IdcBtagMkZD8fPIE2PKwO6PcZ+l0SgkAICRjXo4prx6iPst+W0DzR+fvQsBEB9a6IyQrHqkSAowOeIgRGrb50RICLujAxgg5OaAACSyS2Nr/vriF7DeJn0pm1UribgUID5QY16h6HaGhdwHCAwUP/AUeMG4hZwspwPoUOWDtf1+vTGIAgFSDEyGiLXe9WDiIAAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="list-icon"
    />
  );
};

export default ListIcon;
