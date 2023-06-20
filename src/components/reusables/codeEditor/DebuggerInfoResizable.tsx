import { ReactNode, useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface DebuggingResizable {
  children: ReactNode;
  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
  maxHeight: number;
  minHeight: number;
}

const DebuggingResizable: React.FC<DebuggingResizable> = ({
  children,
  height,
  setHeight,
  maxHeight,
  minHeight
}) => {
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
      minConstraints={[Infinity, minHeight]}
      maxConstraints={[Infinity, maxHeight]}
      onResize={handleResize}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default DebuggingResizable;
