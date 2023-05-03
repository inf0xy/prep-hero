import { ReactNode } from 'react';
import classes from './Button.module.scss';
import { useAppSelector } from '@/hooks/hooks';

type ButtonProps = {
  color?: string;
  children: ReactNode;
  className?: string;
  extraStyle?: object;
  [rest: string]: any;
};

const defaultProps = {
  color: 'primary'
};

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  className,
  extraStyle,
  ...rest
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  const buttonStyle = {
    ...extraStyle
  };
  return (
    <button
      style={buttonStyle}
      className={`${classes[`custom-button--${theme}`]} ${
        classes[`custom-button--${theme}--${color}`]
      } ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
