import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type MenuIconProps = {
  width?: number;
  height?: number;
};

const MenuIcon: React.FC<MenuIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3WwQnAMAzF0IzXZP+zAyV7qCPUF4Mheht8jEFjSJKkRoAFbPrZwMwMeOnrXDFgAkE/ATzpX5Ak3QlbqNTJXMAWKhK2kCTply1U62QuYAsVCVtIkqTRzAfAJW2MY/uB5wAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nO3WMQ6AIAxAUY4nFCn0/oHEeA+dHYxOQuS/pHs7NPnOAQCAgahYSGJNox0jTRJrOWb/eEAS23ovq7dT9v8fkGP2KqX2X9auI6WuoSyvfwEAMCelhYwWUloIADAtpYWMFlJaCAAAuE+cRnyPDvU3aHcAAAAASUVORK5CYII='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="journal icon"
    />
  );
};

export default MenuIcon;
