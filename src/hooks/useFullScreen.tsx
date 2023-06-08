import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

type UseFullScreen = (
  setExpand: Dispatch<SetStateAction<boolean>>
) => () => void;

const useFullScreen: UseFullScreen = (setExpand) => {
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
  }, [setExpand]);

  return handleFullscreenToggle;
};

export default useFullScreen;
