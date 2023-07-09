import Image from 'next/image';

type PreviewIconColorProps = {
  width?: number;
  height?: number;
};

const PreviewIconColor: React.FC<PreviewIconColorProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADr0lEQVR4nO1Yz2sddRB/EawgxKL+Ad5tQ1oDBtEKgm3eezM7851Z1lKPOfTqUfCSotBcats0/UH/gdBCSw9tT21FDHjoKTXaRhQPeihFbSSaCNqmMvtyMN+3+923L++l9LEDA8vuznw/8/3Oz2+tVlFFFVVUUUVbJER8kUCIUD8l0KsMco9R7jPK3xt8397Zt9Y/QiZTe8o0xKATBHKJQVcZ9UkpBl3dkJ0wXduKPIocE+pCadA5TKgLprPvwLWprxHK9V4B53a+Zmv0BbztEKM+zHcJ+YFRZhn1oICMJgeSVw6PHX7e2J65yXvsG6GeItTvA0Y87PlpMMgnjLqeefwgVxy6t8rqpGY8nsZAtt51W7M34FFOZvutfNUNcJ8cuDcZ5Yuc2DixNfAg0xk7/ohBjkxNTT1X6x0NEehHhPJPuyFytCuNBPFkO3j9jZr6XkiOGzzCoDMM8i2j/JVy6/mkgOwOykK8j0AftK8bT5YCbwFHIGs+eHufJ1Ov118glLME8jg3Xaanp6eTJNlRsAG/enJrobU3UfJ+srOVUTb5+x9E8d4Q+Dw/zilit0JGCMgogS77Wc6wFRpAKOf9jGClPyTDoOfK53yZDel0kUP/NA1bYUZocwGQ6SD4Bo+0LQT6M6PGRDRszKiOQZZ8d4qieFd4Y+QzT+axYQz1Nre9NPZN6Kiz0qyBt8Ll/wcAL28Y9n9XOh7SbUWQQe54MrczeyeHrtHmOs14PLTAxi5958nFef8SSOJt0GKRfsPgFzvDmqFc573julCkvGWArmySIxrO+7der7/k7eZKJ2sQyJx3yvOdGDDXawPSDNedARcLDchyoVDABFzI5f3roviDsi4URfp2Ry6UE8QLFkileiWQJQvYNvDOvUqov5QJ4npaHPVuR0Gcl0ZtBAwtYu1BWmG9TGQBaz5vbDvvgzcZouT1kG5COVYmjWYWMhOipkBIxtqD0oUMdCaIo5Wx1ksVstxWAnTZynuuTJLsIJCbnRsgN0Ku6Vqe8GdXrUReM5c2WA0eCRlh7YHvTr7b2M4XgB/z+6BSzVxBO/2AmvpuSM7aAwtOyzC2iymjLjLI50U+H0Wyn1B+33I7HRpoGPXffgw0DPJx9ul1OdAUjpSgX3bSahTqh3SI+bovI2UHQ729u9zFbDzk0L2T3uJlx0vvhvpOr1UI9UcCPeOi+JANP1a4LLCN7RlR3mDUD21qY5CftvVaZSAutgbianFgLncH5Xq9oooqqqii2jNP/wF/+rtDhGUrTAAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default PreviewIconColor;
