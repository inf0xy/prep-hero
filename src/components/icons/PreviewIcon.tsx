import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type PreviewIconProps = {
  width?: number;
  height?: number;
};

const PreviewIcon: React.FC<PreviewIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADn0lEQVR4nO1YSWsVQRB+CioIKuoP8O5CXEARF/AgIooGREWP+QMeBU8SQS/uK/4BUVA8qCcXRMGDp7hHFA+KiCS+TNVUd9XExJaa5KD9ZnpmXl4UHlPQMMx0VX9VU2s3GjXVVFNNNdU0RXJf3VwDsssA9xvkOwb4nQH5RsCsS5/TdxPf+nWv8jT+JznnZlDE2wj4JiEbg+KqLOUh5Y14m8r6p+ANym4DPFAVdO6CVNbuaQdum3aJQb7XMeDoL76rZ0yf1ZGb+S4hHwjlgo2T/URJTxS5Rc65Wbr0mShZmX5DOU/I7wNKNDv+NwjlCAH/ygQOfNuCXV/ZIGDWpTGQIVff6ZkdAs9ns4HLk3aAtygSja41II9yAv3M1IQDn8iwzpgBPuqcm9noEDnnZhiQQwQ8mhHgx9sSSsB9GVYZjmPeEuKL42QFIZ8zwK8JmXRNPp+N42R5iNei3WRAvmcYra8aeEpWErD1wev7PB7n3BwCuUzA47mBDjxGIBedc7NDBjAgQx6fDZ39FzWbboFmFC8zRDSSrAqBz/Pj7LwvD0NKECU9BnnEz3KKrVABA3LVzwha+kM8BHKlas7XlNsIy9zZ8jdBrobBR6NrW5n4RKHPezwE8tmg7BkacvN0GZRegzzou1McJ8vCxuRjHs+4YszvbZCfe+Bfhn51VppV8Fq4/H1R5BZOKvZnmjwdkq1F0AC/8HieZ/ZOBLK91XXMutABk1Z647nHnry9Nk72egZ6VbLg/VXsFGuWAk89Ba4XCU8PQMY/+dRl8vYOD7v5XnLAMmcQ8jVPgafFCiBf67QCmkXaUgD4RhkFWl0oL2DCLtSbt9fGyb6qLmTRbijlQjlBPKCBVK1X4kENWH8fACwmkC8Vg3iOAX5bKogDabQ/dIi2B2l/5GUiDVj1eV1q+RbwwGOIsjQk2yCfLJ1GA4VsnEB2hHi0PaheyPhcSKYaoKXVLipkgVZiRMt7Ho/WCgPyoLQCIPdDrmnUE5DjtlqJ3GYOZEirbkgJbQ98d/LdRi1fAH5NSx9UpZkLttMg3y3azSE+bQ80ODXDqBVTS048nyry+TjirQb5x5Tb6YKB5ud0DDSEcjjz77U70JQYKR+XaTWKyKLdRCjPpmWkLBrq0+Eb+FbV2VgtbtFuTG/qsmOlc0N9hWuVjwRyyUbJAR1+tHBpYOtKi9hIsjqOkoPp1Iby6Z9eq3TFxVZXXC12zeVuV1yv11RTTTXV1BX0GyEyOjbH8sZiAAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADr0lEQVR4nO1Yz2sddRB/EawgxKL+Ad5tQ1oDBtEKgm3eezM7851Z1lKPOfTqUfCSotBcats0/UH/gdBCSw9tT21FDHjoKTXaRhQPeihFbSSaCNqmMvtyMN+3+923L++l9LEDA8vuznw/8/3Oz2+tVlFFFVVUUUVbJER8kUCIUD8l0KsMco9R7jPK3xt8397Zt9Y/QiZTe8o0xKATBHKJQVcZ9UkpBl3dkJ0wXduKPIocE+pCadA5TKgLprPvwLWprxHK9V4B53a+Zmv0BbztEKM+zHcJ+YFRZhn1oICMJgeSVw6PHX7e2J65yXvsG6GeItTvA0Y87PlpMMgnjLqeefwgVxy6t8rqpGY8nsZAtt51W7M34FFOZvutfNUNcJ8cuDcZ5Yuc2DixNfAg0xk7/ohBjkxNTT1X6x0NEehHhPJPuyFytCuNBPFkO3j9jZr6XkiOGzzCoDMM8i2j/JVy6/mkgOwOykK8j0AftK8bT5YCbwFHIGs+eHufJ1Ov118glLME8jg3Xaanp6eTJNlRsAG/enJrobU3UfJ+srOVUTb5+x9E8d4Q+Dw/zilit0JGCMgogS77Wc6wFRpAKOf9jGClPyTDoOfK53yZDel0kUP/NA1bYUZocwGQ6SD4Bo+0LQT6M6PGRDRszKiOQZZ8d4qieFd4Y+QzT+axYQz1Nre9NPZN6Kiz0qyBt8Ll/wcAL28Y9n9XOh7SbUWQQe54MrczeyeHrtHmOs14PLTAxi5958nFef8SSOJt0GKRfsPgFzvDmqFc573julCkvGWArmySIxrO+7der7/k7eZKJ2sQyJx3yvOdGDDXawPSDNedARcLDchyoVDABFzI5f3roviDsi4URfp2Ry6UE8QLFkileiWQJQvYNvDOvUqov5QJ4npaHPVuR0Gcl0ZtBAwtYu1BWmG9TGQBaz5vbDvvgzcZouT1kG5COVYmjWYWMhOipkBIxtqD0oUMdCaIo5Wx1ksVstxWAnTZynuuTJLsIJCbnRsgN0Ku6Vqe8GdXrUReM5c2WA0eCRlh7YHvTr7b2M4XgB/z+6BSzVxBO/2AmvpuSM7aAwtOyzC2iymjLjLI50U+H0Wyn1B+33I7HRpoGPXffgw0DPJx9ul1OdAUjpSgX3bSahTqh3SI+bovI2UHQ729u9zFbDzk0L2T3uJlx0vvhvpOr1UI9UcCPeOi+JANP1a4LLCN7RlR3mDUD21qY5CftvVaZSAutgbianFgLncH5Xq9oooqqqii2jNP/wF/+rtDhGUrTAAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default PreviewIcon;
