import { RefObject, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import ClipboardIcon from '../icons/ClipboardIcon';
import ClipboardCopiedIcon from '../icons/ClipboardCopiedIcon';
import classes from './CopyButton.module.scss';
import variables from '@/styles/variables.module.scss';

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
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleStyle, setVisibleStyle] = useState(false);

  const transition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
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
  }, [parentRef]);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('Error copying content:', error);
      });
  };

  return (
    <>
      {/* {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <div className={classes['copy-button-wrapper']}>
              <div
                className={`${classes['copy-button']} ${isCopied ? classes['is-copied'] : ''} ${className}`}
                // style={{
                //   backgroundColor: isCopied
                //     ? variables.colorSuccess500
                //     : variables.colorGray600
                // }}
              >
                <button onClick={handleCopyClick}>
                  {isCopied ? (
                    <ClipboardCopiedIcon width="8" height="8" />
                  ) : (
                    <ClipboardIcon width="8" height="8" />
                  )}
                </button>
              </div>
            </div>
          </animated.div>
        ) : null
      )} */}

      <div className={classes['copy-button-wrapper']}>
        <div
          className={`${classes['copy-button']} ${
            isCopied ? classes['is-copied'] : ''
          } ${className}`}
          // style={{
          //   backgroundColor: isCopied
          //     ? variables.colorSuccess500
          //     : variables.colorGray600
          // }}
        >
          <div onClick={handleCopyClick}>
            {isCopied ? (
              <ClipboardCopiedIcon width="8" height="8" />
            ) : (
              <ClipboardIcon width="8" height="8" />
            )}
          </div>
        </div>
      </div>

      {/* {isVisible && (
        <div
          className={`absolute z-50 p-2 rounded-md ${className} ${
            visibleStyle ? classes.visible : ''
          }`}
          style={{
            backgroundColor: isCopied
              ? variables.colorSuccess500
              : variables.colorGray600
          }}
        >
          <button onClick={handleCopyClick}>
            {isCopied ? (
              <ClipboardCopiedIcon width="8" height="8" />
            ) : (
              <ClipboardIcon width="8" height="8" />
            )}
          </button>
        </div>
      )} */}
    </>
  );
};

export default CopyButton;
