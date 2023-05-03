import { ReactNode } from 'react';
import classes from './Button.module.scss';
import variables from '@/styles/variables.module.scss';

type ButtonProps = {
  color?: string;
  children: ReactNode;
  className?: string;
  extraStyle?: object;
  [rest: string]: any;
};

const defaultProps = {
  color: variables.colorPrimary100
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  className,
  extraStyle,
  ...rest
}) => {

  const colors: { [key:string]: string } = {
    'primary': variables.colorPrimary300,
    'secondary': variables.colorSecondary100
  }

  const buttonStyle = {
    backgroundColor: colors[color!] || color,
    ...extraStyle
  };
  return (
    <button
      style={buttonStyle}
      className={`${classes['custom-button']} ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
