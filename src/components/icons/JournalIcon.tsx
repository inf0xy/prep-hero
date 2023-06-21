import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type JournalIconProps = {
  width?: number;
  height?: number;
};

const JournalIcon: React.FC<JournalIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUklEQVR4nO2aQU7DMBBFvaF3AE6I2tOVIyCkLKCHadk/lCUWNDIe/zjxf9tI+ZM3iqwZOSVjjDHGmEKAA3ACJuCLTkgKgCfgQoeoOn+hUxQCTnSMQsCUZZ7nX6Jh3t0PXEPALct8bpzXnYAfrJ239FxeUDQWkFEqSN6RaCwgo1SQvCPRWEBGqSB5R6IZRgBB02VUPX/SIjByuoyo5y7RgdHTZW09awgInS5r61lDQNV0uQcBt5rpcg8CrqMLmLJXvpZI2IOAI4HEfKX+GPwcVsAM8Ah8DCtgBngAXoD3X06G/Qv4b54FZKTWIA5cyrMAcUOSOnApzwLEDUnqwKU8CxA3JKkDl/IsQNyQlAcCb0PdEaJzLKA1dM4aAs4t7wiV1iMPpPEdodJ6FIHX0QVMNVvcPQg40jEKAYfILe7mBERvcaNJKgja4m5WgDHGGGPS1vkGvn9e+VadSF8AAAAASUVORK5CYII='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXElEQVR4nO2aPU4DMRCF3cAdgBu43W4lvyftbRA5XXIEhJQCOExCb7RKA1uANjv+i98npX47L54Zz8jOCSGEEEKsxHt/T3IH4Ajgi2Ss4edyMI7jI8nP0sEWMcBf/vkqg89iAMld6SCLGgDguBDdzymRSu+/AEsYcP4pOE3TU0q96gxgZkEZQJ2AqBSgakBUEaS6QFQb5A3fA7zRdOlSwwSCltOlSw2NBa2nS5caGgtaT5c2Uf6BteDW6fIWDDhvmS6bN4DkqWsDsEgBAIc1JjRvQAjhpesi6C9t8KNbA2ZCCA8A3rs1YGYYhjuSzyTflp2hCwOu1ZMB1AmISgGqBkQVQaoLRLVB6h4QXWqoixB/9V0Ar129EWIFQcoA6gTEmlJgn/KN0NrvyS44JX4jtPZ7cgieujYAG7e4zRsQjLe4zbVBb7zFbc4A6y1ukwZYbnGbNUAIIYQQrnW+AdKEnZbeFqozAAAAAElFTkSuQmCC'
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="journal icon"
    />
  );
};

export default JournalIcon;
