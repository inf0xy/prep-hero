import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type XIconProps = {
  width?: number;
  height?: number;
};

const XIcon: React.FC<XIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO3Z0UrDMBTG8T6KFz6Jgnhv50WnT978v1z4DCKoMNnccEjH2jQ5SUs+6MVg5JxfknbZ1jQ1NTU1q0rf97dAm6s+0O57mDWI9/4G8MC3pNfGOJKeJX1JegvGnBCSdvvLGqM/xKF+MEbS5tj87hwDbJvEAbZDtfc9xZqV5CujVDUtMUpdywJjNmFKWMh8CytBwRz3YfTC2RAxG8iOiNFIMYg5DRWHCGmsWMSUBotHjGl0MYhrh71ch89ZGZr9xazEWMyiEKuBaA1bC+gWf7NrDY9fSZuhRoGXs/eUjdEIRPEYTUAUi1EAojgM0IYiisEQAZEdw2VE8GeCOYYECHMMCRFmGH4RnxZHDKXCAE8XEF2TKIqNGdpOx9dhP+3H+abZTR5M0gPwYbUS11YGeHfO3YcOdsBYI/5jZiFO8d4/Zv4ztHPO3eWqX1NTU9MkyQ+V/UIcFIjVawAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO3ZXU6EMBAHcI7igyfRxJjtdD5a8GFXz+6DZzAmarIbDBiNbGRLOy2k/2TfCDO/tkBZmqampqZmU7G2u0Yjba76aKTte1h0EiK6QuOe0cgngXtqlMPWPxC4DwT3EowZEQTu2P+0MTwgvuuHYtBINzR//IlBI4cknf+ufThTu4syKhozw6lqamI4dS0NjNqAccJC6kuYExTMcR1GL5wNEbOB7IgYjRSDWNJQcYiQxopFXNJg8Yg5ja4GMWOzl2XzuShTo7+amZiLWRViMxDewtIicPvVX+y8hdsvGummGrU7/zgeUzwGZyCKx+AFiGIxGIAoDoNG2lBEMRiMgMiOwTOIJc8EdQwmQKhjMCFCDYNGWgR519hicCoMgfNTiH5P1SQKx8ZMLaevjy6hf+1HeNOkkAFk8HcE8qY1E//OjHGvBP427GQDRhvxB7MEMcbu5D7nx1ACt7dWbnLVr6mpqWmS5ARy/iu27aGpxQAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="stop-icon"
    />
  );
};

export default XIcon;
