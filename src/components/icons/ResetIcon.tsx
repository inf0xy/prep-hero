import Image from 'next/image';

type ResetIconProps = {
  width?: number;
  height?: number;
};

const ResetIcon: React.FC<ResetIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABRElEQVR4nN2VXU4CMRDHNyC+iB4EPYX6jGIIhyCKKAfQJ/y4hYJ4IEHx6xAGX/TBHxmZxsZ02202+8IkTZrt9PfvzrQzSbLUBqwCLWAETIFPYAY8AUOgCVQc+86zwA+Ad8L2AuzZcPnoA5eAawvwABwDm8CaDpl3gbH6/AB9Aw8JGPgX0BZBj28Z6ADf/3/LFxYD3w7G8W/fTVBAE2pi3o6An7kS43JsWTEv54GLuZzvf1egkxRhwLMK1IoSmKlAtWiB9RyMDWV8FBIiYEsZU9finS52cwj0lHHru6bjrNfU8aonymimPbQ3dThMIo1FvTLFr5Lm1LBKxU4EfFfrkRS9esj5yhI58oULWNGTm2J3keU0JUvE5OREb0hVh8xPrZjLyS99ldcltA+8EtlwokySpW1R2qO0SXmMMh6BQVrLXC6bA8nPoE0L90y9AAAAAElFTkSuQmCC"
      width={width ? width: 15}
      height={height ? height : 15}
      alt="reset-icon"
    />
  );
};

export default ResetIcon;
