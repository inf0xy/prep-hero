import { ReactNode } from 'react';
import classes from './Button.module.css';
import { buttonColors } from '@/helpers/extraStyles';

type ButtonProps = {
  color?: string;
  children: ReactNode;
  className?: string;
  extraStyle?: object;
  [rest: string]: any;
};

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  className,
  extraStyle,
  ...rest
}) => {
  let chosenColor = color ? buttonColors[color] || color : '#e65715';

  const buttonStyle = {
    backgroundColor: chosenColor,
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

export default Button;
