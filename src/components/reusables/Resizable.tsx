import {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';

interface ResizableProps {
  children: ReactNode;
  setEditorHeight: Dispatch<SetStateAction<string | null>>;
}

const Resizable: React.FC<ResizableProps> = ({ children, setEditorHeight }) => {
  const [height, setHeight] = useState(205);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    setHeight(size.height);
    if (windowHeight) {
      setEditorHeight(`${windowHeight - 188 - size.height}px`);
    }
  };

  return (
    <>
      {windowHeight && (
        <ResizableBox
          width={Infinity}
          height={height}
          resizeHandles={['n']}
          onResize={handleResize}
          axis="y"
          minConstraints={[Infinity, Math.min(windowHeight * 0.2, 155)]}
          maxConstraints={[Infinity, Math.max(windowHeight * 0.6, 500)]}
        >
          {children}
        </ResizableBox>
      )}
    </>
  );
};

export default Resizable;
