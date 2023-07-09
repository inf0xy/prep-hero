import Image from 'next/image';

type TrashIconProps = {
  width?: number;
  height?: number;
};

const TrashIcon: React.FC<TrashIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEIUlEQVR4nO1ZT6hWVRC/RgsrN/0jrRZF/4PUTbapvqBevffN3HPOzO1SSaBikbXQKAxC5YEKQtZGKLJFtqo2/XlFRX9EyHBRbbSNLkqhsj+g1aIoXBRz/5wz3O59T9/7zusLvoGzmTPfnPnNzJmZc78kGdGIRjQiocnJybMMuIcN0DsW6eP2xVMW6aEkSRYkw2c8v2uR/z6dJSDlN8mwkHj+dI33K+W1ybBQmTbeuJcM8F1tS/aU3FQyLGSQ9nnDILujS072fBoh7UuGhYYagDH5jQbore7KUlSXk8Ew/rJLrtzzKXRyOp1ypuu7G+YMwCK/ecYXdHDrjblHAHnTfwUgBX56zgCKKPTt8qKKAO8NuU47uqrNmS4LtCPo5b0Fr2+XJ4Mmg7Q7eIgeGZxety40OX5xUHr/fRDwTnVZNw5KrwV+SkX2mSQWGeTN6qDtNT9N86sN8lZEvl6JL5AoNSNVVDXkrW7cXRUA0HblmM0RAdB6ddAubwDyBxWoz2qeQ9fzsn2+3esAPlClyvtBL+9S/WF9TABr1EC2Rxm1vzr8awXKqYriPB/om0r20yBLr6gZaXU0ABY5a6vRFvijKirHZwSA9EPlgA/bek3adxwNQDWQ1RH4RBkwVaXFLzMBMEi/VuXybeWAUJ4xuzMaAAduharXnwdg9HrF/3NGAEB/VbzXAgD6opZFpJujAZAqo6rQYWXUnppfP1TaAMiecsDL/vfIR3xkTX5dNADGmEtVFfL5bpBeCB7Ec7sAjI09eJ5qWM8374UsuoeWRAOQ5/ki5cHfvQFAz9V859yFXQAQ8SJVLp/1DgD6o+YLyGgAyubEp+rDer3e2c1GBJBf1gWAxulylYLbhCc6lNyp6A9+Pfvnd+cXNDu0dOUuAAB8jUrBTcKTiKmonIhqfGksHfOGWXtFYSzwk543YW/qApCm2VIF4ImSl1+p7sXReQDAh4K3s6WlsfSYvwPgVnQBMP3sliDHjwqPgJaptDoYHYDMO94IdLc2RwyZgboA6DdxPTJYyG5TEdgfHYAMYWFIIyh5dH8YBWi8C4BDN6F49xW81KG6A+9FByAd1Hs7zR4QXpo6q0YM6gIgc46SM5XcSsV7NTqAtldZmtJYE5QY2DRW9sL9obESgLwZfAR2xwfQ8irLx/OLLfCPMqjVZbTfzxdbpO8M8rdpml5SAJhw11qk36TzSlNLyqKwUd2BndEBWKAtzWYk1OutWtjsojL7ND/iSjfP8/wcpW+b0rclOgADvKHtVTZrfaheY8AbBmPldAcC3asAHBLPz1ZXr7dqoUH+Sl32LIlNMj7o4csCfz/9Z8dpPh8iH9fDIQCcn8wHWaDHldcGskzMx3wbFX8nIf08Z8OBf6r+dpp/Kkbh6rPjbBYBLatH8hGNaEQjSv6X9A/87FLYbWdr8QAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="trash icon"
    />
  );
};

export default TrashIcon;
