import { ReactNode } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import classes from './Button.module.scss';

type ButtonProps = {
  id?: string;
  color?: string;
  children: ReactNode;
  className?: string;
  extraStyle?: object;
  [rest: string]: any;
  disable?: boolean
};

const defaultProps = {
  color: 'primary'
};

const Button: React.FC<ButtonProps> = ({
  id,
  color,
  children,
  className,
  extraStyle,
  disable,
  ...rest
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  const buttonStyle = {
    ...extraStyle
  };
  return (
    <button
      id={id ?? ''}
      aria-label={id ?? ''}
      style={buttonStyle}
      className={`${classes[`custom-button--${theme}`]} ${
        classes[`custom-button--${theme}--${color}`]
      } ${className || ''}`}
      disabled={disable}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
