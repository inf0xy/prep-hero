import { ReactNode, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useAppSelector } from '@/hooks/hooks';
import classes from './Tooltip.module.scss';

type TooltipProps = {
  text: string;
  children: ReactNode;
  direction: 'top' | 'bottom';
  className?: string;
  extraStyle?: object
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  direction,
  className,
  extraStyle
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const transition = useTransition(isHovered, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const { theme } = useAppSelector(state => state.theme);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={classes['tooltip-container']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <div
              className={`${classes.tooltip} ${
                classes[`tooltip--${direction}`]
              } ${classes[`tooltip--${theme}`]} ${className}`}
              style={extraStyle}
            >
              {text}
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default Tooltip;
