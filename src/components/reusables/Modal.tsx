import { useState, ReactNode, MouseEventHandler } from 'react';
import { useMediaQuery } from 'react-responsive';
import Portal from './Portal';
import FullScreenButton from './codeEditor/FullScreenButton';
import { useAppSelector } from '@/hooks/hooks';

type ModalProps = {
  children: ReactNode;
  id: string;
  className?: string;
  type?: undefined | 'close-button';
  buttonSize?: string;
  onClose?: MouseEventHandler<HTMLLabelElement> | undefined | null;
  isOpen?: boolean;
  fullScreenToggle?: boolean;
  showCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  id,
  className,
  type,
  buttonSize,
  onClose,
  isOpen,
  fullScreenToggle,
  showCloseButton
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { theme, showFullScreen } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { showFullScreen } = state.navigate;
    return { theme, showFullScreen };
  });

  const isMobile = useMediaQuery({ query: '(max-width: 642px)' });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 521px)' });
  const isSmallMobilePortrait = useMediaQuery({ query: '(max-width: 400px)' });

  const modalStyle = {
    width: fullScreen || isMobile ? '100vw' : '70vw',
    height: fullScreen || isMobile ? '100vh' : '60vh'
  };

  const getDimension = () => {
    let dimension = '';
    if (showFullScreen || isSmallMobile) {
      dimension =
        'max-w-[100vw] max-h-[100vh] w-[100vw] min-w-[100vw] min-h-[100vh] h-[100vh]';
    } else if (isMobile) {
      dimension =
        'max-w-[85vw] max-h-[75vh] w-[85vw] min-w-[85vw] min-h-[75vh] h-[75vh]';
    }
    return dimension;
  };

  const modalWithoutCloseButton = (
    <div className={`${!isOpen && 'opacity-0'}`}>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isOpen}
        readOnly={true}
      />
      <label htmlFor={id} className="modal cursor-pointer">
        <label
          className={`modal-box relative p-0 ${className} ${getDimension()}} ${isSmallMobilePortrait && 'small-mobile-portrait'}`}
          style={{ borderRadius: showFullScreen || isSmallMobile ? 0 : '1rem'}}
          htmlFor=""
        >
          {children}
        </label>
      </label>
    </div>
  );

  const modalWithCloseButton = (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div
          className={`w-fit h-fit p-[1px] rounded overflow-hidden ${
            theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
          }`}
          style={{ borderRadius: '1rem' }}
        >
          <div
            className={`modal-box relative p-0 ${
              fullScreenToggle && fullScreen ? 'full-screen' : ''
            } ${!className?.includes('max-w') ? 'max-w-fit' : ''} ${className}`}
            style={fullScreenToggle ? modalStyle : {}}
          >
            {fullScreenToggle && (
              <span
                className="absolute right-10 top-[6.8rem] scale-[86%] z-10 cursor-pointer"
                onClick={() => setFullScreen(!fullScreen)}
              >
                <FullScreenButton />
              </span>
            )}
            {(showCloseButton === undefined || showCloseButton === true) && (
              <label
                htmlFor={id}
                className={`btn ${buttonSize} btn-circle absolute right-8 top-7 bg-[#474747]  hover:bg-[#404040] border-0`}
                onClick={onClose ?? undefined}
              >
                <span className="text-xl">✕</span>
              </label>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const content =
    type === 'close-button' ? modalWithCloseButton : modalWithoutCloseButton;

  return (
    <>
      {typeof window !== 'undefined' && (
        <Portal container={document.body}>{content}</Portal>
      )}
    </>
  );
};

export default Modal;
