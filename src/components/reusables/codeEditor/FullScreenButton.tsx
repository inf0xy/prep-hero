import { useState, useEffect } from 'react';
import ExpandIcon from '@/components/icons/ExpandIcon';
import Tooltip from '../Tooltip';
import MinimizeIcon from '@/components/icons/MinimizeIcon';
import useFullScreen from '@/hooks/useFullScreen';
import { useAppSelector } from '@/hooks/hooks';

type FullScreenButtonProps = {
  className?: string;
  width?: number;
  height?: number;
};

const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  className,
  width,
  height
}) => {
  const [expand, setExpand] = useState(false);
  const handleFullscreenToggle = useFullScreen(setExpand);
  const { theme } = useAppSelector(state => state.theme);

  return (
    <Tooltip
      text={!expand ? 'Full screen' : 'Minimize'}
      direction="bottom"
      className="left-[-1.7rem] w-[10rem] px-6 py-4"
    >
      <button onClick={handleFullscreenToggle} className={`${className} ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {!expand ? (
          <ExpandIcon width={width ? width : 6} height={height ? height : 6} />
        ) : (
          <MinimizeIcon
            width={width ? width : 6}
            height={height ? height : 6}
          />
        )}
      </button>
    </Tooltip>
  );
};

export default FullScreenButton;
