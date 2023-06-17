import Image from 'next/image';

type ExitIconProps = {
  width?: number;
  height?: number;
};

const ExitIcon: React.FC<ExitIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZklEQVR4nO2av2sUQRTHR4QINqYQRIxo9s0qpLcQC1GT91YNCEIsLa2Mf4Oddf4D/Q9sjJ2lv5pLoRAOwpn37rBIkZAcivhjZbyT3K3u7d7uzt7esF+Ybm++77Pv7dzM8JRKUFMHx8SnRwz0loG6oiksczBQt+eNqyYWlUfs3z7DQBtlQ4yAa5iYMsGYt1ElGBmAypQpU2aTDl5iofDh+EBA74Ym0fhCdDCnSpboYI41rUeA3ow9EQMdDL+Z8mH+qg14NgK0r8ZVNM1qwpK88dRAliV1hiKqS86yZFpKLlTqyJa3eCLpOdb4cyqAWNPT/n/LWqhWjsbG49Nd0fil+kBDO3h83jm9fDzu2TbQZQbcqTTQfzafG6N21Nv+DY8BN3Mb5Q08rc+fAdj6pIOFuN90LiyfzG2UN/C0PoP7NQYMrBkVNnGCT6T8vgvgAytGhUyawicmW2tmeS/UKPF5L7jFgGLtUKfp2YeFlZnSgGzCyCHUq9a5q7OlANmGkUOopniLvjNA0vumdjre0hVngKQ3vraB7rkEFLKmXwL02CEg/GGu25wAYqDuNtCdVDDVB8LPPB9cSg1TaSDAj62LdH4smCxA7v2xeks3WRM7s/XJqrRLc1j25rQon8j38k0A71sxKmTSFD4DY1cAr1kzKmziBB8Hj+D4fmv++qlpviTZc+oai4GemJXMmYtGo1EgU3cVXFo8UgPZldQZiqguOcuSvCXnXuMFRFtjaN1MrCYD87KA1hhctXVYm0jzUrPXXtaoHgw1Mp9c+w2ADScaAFVf5m2YFJu6/XehKAXigDW+NjGkycxv4JwEhE1M6xMAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default ExitIcon;
