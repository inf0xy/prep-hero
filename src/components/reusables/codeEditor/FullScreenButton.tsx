import { useState, useEffect } from 'react';
import ExpandIcon from '@/components/icons/ExpandIcon';
import Tooltip from '../Tooltip';
import MinimizeIcon from '@/components/icons/MinimizeIcon';

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
  const handleFullscreenToggle = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        elem.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setExpand(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <Tooltip
      text={!expand ? 'Full screen' : 'Minimize'}
      direction="bottom"
      className="left-[-1.7rem] w-[10rem] px-6 py-4"
    >
      <button onClick={handleFullscreenToggle} className={className}>
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
