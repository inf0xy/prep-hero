import Image from 'next/image';

type FailIconProps = {
  width?: number;
  height?: number;
};

const FailIcon: React.FC<FailIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABP0lEQVR4nO2Yy07DMBBF8yksiHiIHbXdXYUd+P8/YAGitN30xkEsQZaChAKJnHTsTKq5Uraec2QnnkxRSCQSiUQSmdrqW1SmLBLluFlfhhpJFq+f7q+91W/e6W1dmRvq9VGZ0jv12li184+ruyTwjdNf4aGWwA98uz6pRBeeWgJdeGqJz4258E49/ylAIIE+eOpdTiGRDT6FRHZ4SonZ4CkkZoc/RYIN/BQJdvBjJNjCx0g0Tu8bp97ZwkdK8IYfK8ES/rdE3XPeW/gDW/iQ8MJ+WL0d2AG+Ahj42rA/QoiEZymBIXir9wGWrQQiLqnwn+udemEngRE3LDsJTGgP2EjghN5mdgkQNGatRP7mDoRdZfYOFQkKZpNAwkLIIYGH1dWiB1v/SSxqtNiVWORwN9d4HZUpk43XJRKJRHKW+QaUqwzfL9sYYwAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="fail-icon"
    />
  );
};

export default FailIcon;
