import { ReactNode, useState, useRef } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface ResizableProps {
  children: ReactNode;
  maxHeight?: number;
  minHeight?: number
}

const DebuggingResizable: React.FC<ResizableProps> = ({ children, maxHeight, minHeight }) => {
  const [height, setHeight] = useState(200);

  const handleResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    setHeight(size.height);
  };

  return (
    <ResizableBox
      axis="y"
      width={Infinity}
      height={height}
      minConstraints={[Infinity, minHeight ? minHeight : 200]}
      maxConstraints={[Infinity, maxHeight ? maxHeight : 500]}
      onResize={handleResize}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default DebuggingResizable;
