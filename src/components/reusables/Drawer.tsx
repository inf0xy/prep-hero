import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from 'react-spring';
import XIcon from '../icons/XIcon';
import variables from '@/styles/variables.module.scss';
import { useAppSelector } from '@/hooks/hooks';

type DrawerProps = {
  children: ReactNode;
  direction: 'left' | 'right';
  isOpen: boolean;
  closeDrawer: () => void;
};

const Drawer: React.FC<DrawerProps> = ({
  children,
  direction,
  isOpen,
  closeDrawer
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

  return (
    <>
      {shouldRender &&
        createPortal(
          <div>
            {transition((style, item) =>
              item ? (
                <animated.div style={{ ...style, position: 'relative' }}>
                  <button
                    className={`absolute top-[2rem] right-[2rem] rounded-lg p-2 duration-300 ease ${
                      theme === 'dark'
                        ? 'hover:bg-[#4f4c52]'
                        : 'hover:bg-[#dfdbe6]'
                    }`}
                    onClick={closeDrawer}
                  >
                    <XIcon />
                  </button>
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
