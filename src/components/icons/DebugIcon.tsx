import Image from 'next/image';

type DebugIconProps = {
  width?: number;
  height?: number;
};

const DebugIcon: React.FC<DebugIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFZElEQVR4nO1aTYgcRRQu/4356fd6Y4JmRVD8x9+TXnJQNKJIRMGA+QE9iRdPihiRqBdFhVwS9GgSERf1oHGD8WeIO/2qs45B4rKbbKaqs6sxWQQ3P0pWYxx5vbOmp6Z7t3umu2cW+oOCoabq1Xtfv6p6Va+EKFCgQIECBVKFV7bumA8yM4GSuEkR/usRPpOWzKq0nlKEZxXBG6LbjdcSa1zSImHG+HNyu5QEz7HuDCpaJ+GscuynW5XJfcNk8liiG6EiFOZ6r3T1pVVpPaYJtyoCV0uc0IR/+0XihF9HuJXbcNvZZIluhopQXBMeD9bNWgiPz0vjo+ZtuyXtRTVzDJUuX6Ql/JQWAVrifpYp5gOUXLZcE1ZCv6TE3xXBe9qF1YcG8Sqe6+PUu4B/cx3/x20ipsX3VWfhMtHN8EoWKILhZheGPxXBSyPlnsVzyeA2SsJG7hMiZ1hV0BLdiFqfuEBJ2BXy1X8YG7SuSSpvtLzkWiVxXwgJ/TyW6DYowteb3Ra+OFK54rJWZR79cfnCUFIJXxPdhEN78Zb6fh5U8tvRfnFJu7L9mICwZKwHfx127ZtFN6BWE+dpwoHGrwQnx8o9V6Y1xjjZK1imMbX28NgiL1Rd616O9XmhC9Z7hA9GrNq/aYK3Pde+u1YT5ycdj/t4ZbxHE7zjywobw8FVTYuwxE2sq0gbSuKeOvOTQSK0xK/njuzgmJLwkZL4IivNU4Y9hLdALvzbn0YOruI23NYPleeMD+CroOGs24x3pGq8dmBlyOo+qQm3pBjstFYIt8wY3ugdsDI1ApTET+MpA7t5v9cEP6dvKIzXZe+O0551To0Az3CxyOLCam7P+3TVse5TEt5VEo60ajT3ZRk8p2f2fs+xHp3D8IYpmiq8WYmAk5WKuCisHwdCmmCDInhLE34SGuBwHcHH021gQ1TwNDQkLjZ3hMwNN8GDaIk7DCU+FwlgGpCoL+FOo/+OXAwPgq+mjMXoeZEfAS80fP1OXJNp4ysoFx/OiwBF8IjR/zORN5SEkaASVbn4utwI2Lv0esMDhkXe0ATHgkqM0xI7LwIOVBYtNQg4KvKGljgVVIJX57wI4EOW0X9K5A0t8UyjB/QuyIsAPmIb/c+IvKElnGokwF6RFwH+FVpjDHIqsQGtKqqjo7bb2pGbNE8YV6/EBpuIOxAfi0UCtKNoVeJDXUeAJnilHblJ+iqJr3YdAUrCrnbkJuob80SYCgFRGHXt3kYCcDLJVtiqov5hyEizsS6iE9BG9kdJ+/GsCdCETxh994tOQfHRtTEi68+aAEXwpTH13hSdwmGy7jKmwT8cp2dFgOf03GgmXTv+VkBLcBp3A9yZFQHsYcZYA6LTUBLWmcbwPp02AXzcDtl51olOwpP2TWFpcD6dcbiaFgF8ba4k/BJCwAHtwu2iE9DTd3x/RMcFuG+2vGBcAviQpSUMzhJ/nNYSnhO5Pn4g3B4rECH8ZmzAwlYJ4DuGprxg9FjbM39EoQhvNW+CzhXo42xwmJuG7QxzEaDLPTdogoPNhvIY0BfhDSOsYybGj/uu2JyuYhdUEp4NeEfY65ApjhmCN7dRBLDHcE6RM8AhJA/OfGUec9r9m8aaSHo3ERvahfXG1zhoPmFlAxSBDHdTOKEIPtQS14T8v8b/j+BEhIc5TYlZPhabXuLCepElFOG2+mAfRD158W9s4q4TMYqS+H7Ugso6sC7Tuw9uy9T4/9/wEKwVcWME4/I0UeGsMuGTscYiWBvnDVLu8PwsErwcL90dMFzCxtyzPVmC84batR9QhJs14XeK4Nf6Anqaf0/X4WYl7ftLJXFhpsoUKFCgQIECBQoUEAX+A2vPLrMwRuzrAAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default DebugIcon;