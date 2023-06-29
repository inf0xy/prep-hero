import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/hooks/hooks';
import { useTransition, animated } from 'react-spring';
import XIcon from '../icons/XIcon';
import variables from '@/styles/variables.module.scss';

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

  let buttonPositionX = 'right-[2rem]';
  let buttonPositionY = 'top-[2rem]';
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
          <div>
            {transition((style, item) =>
              item ? (
                <animated.div
                  style={{
                    ...style,
                    position: 'relative',
                    borderRadius:
                      direction === 'left' ? '0 6px 6px 0' : '6px 0 0 6px',
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
                      className={`absolute ${buttonPositionX} ${buttonPositionY} rounded-lg p-2 duration-300 ease ${
                        theme === 'dark'
                          ? 'hover:bg-[#4f4c52]'
                          : 'hover:bg-[#dfdbe6]'
                      }`}
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
