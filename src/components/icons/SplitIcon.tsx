import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type SplitIconProps = {
  width?: number;
  height?: number;
};

const SplitIcon: React.FC<SplitIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoUlEQVR4nO2Wv0rEQBCHIygiCIKFhYWCNja+hzb6GNpb6hP4GldbeZ2VVjYKYqOICv6DswiZyc7NeBysbOLJgSeXvSSuynww1SyZ35e5SxJFiqIo/wJC2SSQVwJpEciGbz84BuSZUKwrA/Lk2w9OL1yvfPvBUYHQ6AZCoxsIjW6gTqy1E4S8b1B2696AQdlzs9zMqsJPEXIz/wTgbu0CwN38DDfd7FLh49jOGJCTIoOrEqC+MwblNEns7Ejh0zSdI+DzUQZXJUCugC+JaN4rfDtuLxrk6y8XCyGA2SZuOeHlQuERZcWAPAy6kE8VCUY+BfKSpm+rQwWcbelhdQhgtomboQLZb+6XChDwxVCBdtxeIOSr3yZg8v/BUlQE9+hyj7Aiwb4L6NvvMViAz9xTMfLBtuw0gRyFFjAgx+595BX+U8LaSQN8EE6AD0u/ja2144TSyO8Gd+oWMMCdjzMNN7tU+D6JsRRkh5C36hYg5G03y82MfpKqBIKhAqHRDYRGNxAa3UBoDMp936fvnW8/OAZk3YA8ZpXwmm9fURQl+pO8A1jFZ8mD0wryAAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVR4nO2WvUoDQRSFV1BEEAQLCwsFbWystsg95y5suzb6GNpb6hP4GqmtTGellY2C2CgSBf9AHyEIymyiBDRkJ9nNRLkf3OoOc87ZO8xsFBmGYfwLSG5B+EbRV9a46dsPDkSfCf3o1JNvPzhd5vLy7QfHAoTGJhAam0BobAJVEsfxFKAHrHGv6gkAuu+0nGYp5kVkhqINJwrhe+UBhO/5GtGG0x7KfBzHcxA9LSJcVgB2rQF4JiLzA5kHsEDRi0GEywrA9iSuSC76ml8GePNjsxABkB/dJsnVoubXAD78tpFPFTFGj4LwRUTW+wdwaYcUqyIA23XbN0B+5sY2AC/7BlDVJYhej1sACJtJkqxERXBXl7vCihjrZdC3/0WPL3/ubsXIhzRNZwkeBw8geuLeo2gQsiybBngYLIDwaOjXOE3TSYjWO5u2RhCg1T7zWnfaUUlMALorotuVBxDuOC2nGY2SsgIEwwKExiYQGptAaGwCoSH0/vvXF7zz7QdHa7pB6KMrkSTz7RuGYUR/kk+UqR1OEXeYbwAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default SplitIcon;
