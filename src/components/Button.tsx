import { ReactNode } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  paddingX: string;
  paddingY: string;
  color?: string;
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  paddingX,
  paddingY,
  color,
  children,
  className,
  ...rest
}) => {
  let chosenColor = '';
  if (color) {
    if (color === 'prirmay-100') {
      chosenColor = '#e65715';
    } else if (color === 'prirmay-200') {
      chosenColor = '#993507';
    } else if (color === 'secondary-100') {
      chosenColor = '#15e6d0';
    } else if (color === 'secondary-200') {
      chosenColor = '#009989';
    } else {
      chosenColor = color;
    }
  }

  const buttonStyle = {
    padding: `${paddingY} ${paddingX}`,
    backgroundColor: chosenColor
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
