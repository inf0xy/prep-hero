import {
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';
import {
  ResizableBox,
  ResizeCallbackData,
  ResizeHandle
} from 'react-resizable';

interface ResizableProps {
  children: ReactNode;
  axis: 'x' | 'y' | 'both' | undefined;
  resizeHandles: ResizeHandle;
  height?: number;
  width?: number;
  setHeight?: Dispatch<SetStateAction<number>>;
  setWidth?: Dispatch<SetStateAction<number>>;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  windowHeight?: number;
  windowWidth?: number;
}

const Resizable: React.FC<ResizableProps> = ({
  children,
  axis,
  resizeHandles,
  height,
  width,
  setHeight,
  setWidth,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth
}) => {
  const handleResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    if (setHeight) {
      setHeight(size.height);
    }

    if (setWidth) {
      setWidth(size.width);
    }
  };

  const minConstraints: [width: number, height: number] = minHeight
    ? [Infinity, minHeight]
    : [minWidth!, Infinity];
  const maxConstraints: [width: number, height: number] = maxHeight
    ? [Infinity, maxHeight]
    : [maxWidth!, Infinity];

  return (
    <ResizableBox
      axis={axis}
      resizeHandles={[resizeHandles]}
      width={width || Infinity}
      height={height || Infinity}
      onResize={handleResize}
      minConstraints={minConstraints}
      maxConstraints={maxConstraints}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
