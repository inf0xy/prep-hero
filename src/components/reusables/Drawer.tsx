import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/hooks/hooks';
import XIcon from '../icons/XIcon';
import variables from '@/styles/variables.module.scss';
import classes from './Drawer.module.scss';

type DrawerProps = {
  children: ReactNode;
  direction: 'left' | 'right';
  isOpen: boolean;
  closeDrawer?: () => void;
  showCloseButton: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  closeButtonWidth?: number;
  closeButtonHeight?: number;
};

const Drawer: React.FC<DrawerProps> = ({
  children,
  direction,
  isOpen,
  closeDrawer,
  showCloseButton,
  top,
  bottom,
  left,
  right,
  closeButtonWidth,
  closeButtonHeight
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { theme } = useAppSelector((state) => state.theme);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 990px)' });

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const transition = useTransition(isOpen, {
    from: {
      transform: `translateX(${direction === 'left' ? '-100%' : '100%'})`
    },
    enter: { transform: 'translateX(0%)' },
    leave: {
      transform: `translateX(${direction === 'left' ? '-100%' : '100%'})`
    }
  });

  let buttonPositionX = !isTabletOrMobile ? 'right-[2rem]' : 'right-[2.5rem]';
  let buttonPositionY = !isTabletOrMobile ? 'top-[2rem]' : 'top-[2.5rem]';
  if (left || right) {
    buttonPositionX = left ? `${left}` : `${right}`;
  }

  if (top || bottom) {
    buttonPositionY = top ? `${top}` : `${bottom}`;
  }

  return (
    <>
      {shouldRender &&
        createPortal(
          <div className={`${classes.drawer} ${classes[direction]}`}>
            {transition((style, item) =>
              item ? (
                <animated.div
                  style={{
                    ...style,
                    borderLeft:
                      direction === 'right'
                        ? theme === 'dark'
                          ? `solid ${variables.darkBackground100} 1px`
                          : `solid ${variables.colorGray100} 1px`
                        : undefined,
                    borderRight:
                      direction === 'left'
                        ? theme === 'dark'
                          ? `solid ${variables.darkBackground100} 1px`
                          : `solid ${variables.colorGray100} 1px`
                        : undefined
                  }}
                >
                  {showCloseButton && (
                    <button
                      className={`${buttonPositionX} ${buttonPositionY} ${
                        classes['close-button']
                      } ${classes[`close-button--${theme}`]}`}
                      onClick={closeDrawer}
                    >
                      <XIcon
                        width={closeButtonWidth ?? 20}
                        height={closeButtonHeight ?? 20}
                      />
                    </button>
                  )}
                  {children}
                </animated.div>
              ) : null
            )}
          </div>,
          document.querySelector(`#drawer-${direction}`) as HTMLElement
        )}
    </>
  );
};

export default Drawer;
