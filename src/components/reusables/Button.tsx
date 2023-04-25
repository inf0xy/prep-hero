import { ReactNode } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  color?: string;
  children: ReactNode;
  className?: string;
  extraStyle?: object;
  [rest:string]: any;
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  className,
  extraStyle,
  ...rest
}) => {
  let chosenColor = '#e65715';
  if (color) {
    if (color === 'primary-100') {
      chosenColor = '#e65715';
    } else if (color === 'primary-200') {
      chosenColor = '#c25421';
    } else if (color === 'secondary-100') {
      chosenColor = '#15e6d0';
    } else if (color === 'secondary-200') {
      chosenColor = '#009989';
    } else {
      chosenColor = color;
    }
  }

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
