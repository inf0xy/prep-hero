import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type PlusIconProps = {
  width?: number;
  height?: number;
};

const PlusIcon: React.FC<PlusIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3SMQrDQAwAQf3/kfpK0gaXBpu9MAPqJVYzAMCzdvfzO3OqdUiMIjWK1ChSo0iNIjW5IntZ6O0Zh1wosrHXuiu30F0OqVGkRpEaRWoUqVGk5m+KAMAc4gsvkl+eaS7vLQAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYUlEQVR4nO3SMQrDQAwAQT3QcOD//yVpzZWGhLWZAfUSqxkA4LfWcX6uM0+1HBKjSI0iNYrUKFKjSE2uyNoW+veMQzaKHLHXuiu30F0OqVGkRpEaRWoUqVGk5jVFAGAe4gsUw81QLkT4ZgAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default PlusIcon;
