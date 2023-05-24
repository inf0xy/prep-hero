import {
  RefObject,
  useState,
  useEffect
} from 'react';
import { animated, useSpring } from 'react-spring';
import ClipboardIcon from '../icons/ClipboardIcon';
import ClipboardCopiedIcon from '../icons/ClipboardCopiedIcon';
import classes from './CopyButton.module.scss';
import Tooltip from './Tooltip';

import useCopy from '@/hooks/useCopy';

type CopyButtonProps = {
  content: string;
  className?: string;
  parentRef: RefObject<HTMLDivElement>;
};

const CopyButton: React.FC<CopyButtonProps> = ({
  content,
  className,
  parentRef
}) => {
  const { isCopied, setIsCopied, handleCopyClick } = useCopy();
  const [isVisible, setIsVisible] = useState(false);

  const fadeAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 }
  });

  useEffect(() => {
    const parentDiv = parentRef.current;
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    const handleMouseLeave = () => {
      setIsCopied(false);
      setIsVisible(false);
    };

    parentDiv!.addEventListener('mouseenter', handleMouseEnter);
    parentDiv!.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentDiv!.removeEventListener('mouseenter', handleMouseEnter);
      parentDiv!.removeEventListener('mouseleave', handleMouseLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef]);

  return (
    <div className={`${classes['copy-button-wrapper']} ${className}`}>
      <div className="relative">
        <animated.div
          style={{
            ...fadeAnimation,
            height: 'fit-content',
            width: 'fit-content',
            zIndex: 100,
            position: 'absolute'
          }}
        >
          <Tooltip
            text={isCopied ? 'Copied' : 'Copy'}
            direction="bottom"
            className="left-[1rem] w-fit px-5 py-3"
          >
            <div
              className={`${classes['copy-button']} ${
                isCopied ? classes['is-copied'] : ''
              } `}
            >
              <div onClick={() => handleCopyClick(content)}>
                {isCopied ? (
                  <ClipboardCopiedIcon width="8" height="8" />
                ) : (
                  <ClipboardIcon width="8" height="8" />
                )}
              </div>
            </div>
          </Tooltip>
        </animated.div>
      </div>
    </div>
  );
};

export default CopyButton;
