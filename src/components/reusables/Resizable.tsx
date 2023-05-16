import { ReactNode, useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
  children: ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ children }) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth((window.innerWidth - 30) / 2);
    }
  }, []);

  return (
    <>
      {width && (
        <ResizableBox width={width} height={100} resizeHandles={['n']}>
          {children}
        </ResizableBox>
      )}
    </>
  );
};

export default Resizable;
