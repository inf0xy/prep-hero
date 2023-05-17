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
  const [height, setHeight] = useState(155);

  const handleResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    setHeight(size.height);
    setEditorHeight(`${window.innerHeight - 195 - size.height}px`);
  };

  return (
    <ResizableBox
      width={Infinity}
      height={height}
      resizeHandles={['n']}
      onResize={handleResize}
      axis="y"
      minConstraints={[Infinity, 155]}
      maxConstraints={[Infinity, 500]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
