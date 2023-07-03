import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type TextEditIconProps = {
  width?: number;
  height?: number;
};

const TextEditIcon: React.FC<TextEditIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nO2aSw7CMAwFs4C7gbj/BYA70ORhBXUHEqCWfBqSGSnbJk8e1QvbOQAAgLGJMe5jjDvXMpp0Cv5+lbfY0gn+ftGkY/bAYf5wAwE/hD5nD6wGgn07BE5FDVSRCvsNlHaZDKn1jsUMFzi8aUtr2kGuwKnvWMzc3J8vmy/RTYfqFU58RzWq/2W3RgQ2KtwVQmlD6a4QShtKd4VQ2lC6K4TShtJdIZQ2lO4KobShdFcIpQ2lu0IobSj91+jHrZ9iWzmlSdn6KTL+LE1zOxulGS5wGE7p6XVSvyZskxN9AAAAcKk8ANiW1PEJ8oE7AAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA40lEQVR4nO3aMQ7CMAyF4Qxwog7UNlJXEPe/AOEeRd0QYiikSY3zf1Lm5ilPzRCnBABA34ZhOE7TdEieichNxR4qNjtb2U523TywimUH4T4uEb3XCDx7XgQupQ5OkROWHSqdNmpIq32s1mPgXHIdbBi4aB+rLZf768eWj4zj+dI6cOk+mmn+l92bEtg44VCUShuVDkWptFHpUJRKG5UORam0UelQlEoblQ5FqbRR6VCUShuVDkWptFHpvya/T/3UmcqprWTqp8rzZ23uZjZq6zFw7qrS9vZS/01Yly/6AAAglXoCZRUoqsrBzgUAAAAASUVORK5CYII='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default TextEditIcon;
