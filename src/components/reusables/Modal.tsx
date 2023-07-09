import {
  useState,
  useRef,
  ReactNode,
  MouseEventHandler,
  useEffect
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/hooks/hooks';
import Portal from './Portal';
import FullScreenButton from './codeEditor/FullScreenButton';
import XIcon from '../icons/XIcon';

type ModalProps = {
  children: ReactNode;
  id: string;
  className?: string;
  type?: undefined | 'close-button';
  buttonPosition?: string;
  onClose?: MouseEventHandler<HTMLLabelElement> | undefined | null;
  isOpen?: boolean;
  fullScreenToggle?: boolean;
  showCloseButton?: boolean;
  noBorderRadius?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  id,
  className,
  type,
  buttonPosition,
  onClose,
  isOpen,
  fullScreenToggle,
  showCloseButton,
  noBorderRadius
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { theme, showFullScreen } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { showFullScreen } = state.navigate;
    return { theme, showFullScreen };
  });

  const modalRef = useRef(null);

  const isMobile = useMediaQuery({ query: '(max-width: 642px)' });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 521px)' });
  const isSmallMobilePortrait = useMediaQuery({ query: '(max-width: 400px)' });
  const isExtraSmallMobile = useMediaQuery({ query: '(max-width: 390px)' });

  const modalStyle = {
    width: fullScreen || isMobile ? '100vw' : '70vw',
    height: fullScreen || isMobile ? '100svh' : '60vh'
  };

  const getDimension = () => {
    let dimension = '';
    if (showFullScreen || isSmallMobile) {
      dimension = isExtraSmallMobile
        ? 'max-w-[100vw] max-h-[100svh] w-[100vw] min-w-[100vw] min-h-[100svh] h-[100svh]'
        : 'max-w-[100vw] max-h-[100lvh] w-[100vw] min-w-[100vw] min-h-[100lvh] h-[100lvh]';
    } else if (isMobile) {
      dimension = isExtraSmallMobile
        ? 'max-w-[85vw] max-h-[75svh] w-[85vw] min-w-[85vw] min-h-[75svh] h-[75svh]'
        : 'max-w-[85vw] max-h-[75lvh] w-[85vw] min-w-[85vw] min-h-[75lvh] h-[75lvh]';
    }
    return dimension;
  };

  useEffect(() => {
    if (fullScreenToggle && modalRef.current) {
      if (fullScreen) {
        (modalRef.current as HTMLElement).classList.add('full-screen');
      } else {
        (modalRef.current as HTMLElement).classList.remove('full-screen');
      }
    }
  }, [fullScreen, fullScreenToggle]);

  const [modalHeight, setModalHeight] = useState<number | undefined>(undefined);
  const [virtualKeyboardHeight, setVirtualKeyboardHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      setModalHeight(window.innerHeight);
    }

    if ('virtualKeyboard' in navigator) {
      (navigator.virtualKeyboard as any).overlaysContent = true;
      (navigator.virtualKeyboard as any).addEventListener(
        'geometrychange',
        (event: any) => {
          const { height } = event.target.boundingRect;
          setVirtualKeyboardHeight(height);
        }
      );
    }

    return () => {
      if ('virtualKeyboard' in navigator) {
        (navigator.virtualKeyboard as any).overlaysContent = false;
        (navigator.virtualKeyboard as any).removeEventListener(
          'geometrychange',
          (event: any) => {
            const { height } = event.target.boundingRect;
            setVirtualKeyboardHeight(height);
          }
        );
      }
    };
  }, []);

  useEffect(() => {
    if (windowHeight) {
      if (virtualKeyboardHeight > 0) {
        setModalHeight(windowHeight - virtualKeyboardHeight + 70);
      } else {
        setModalHeight(windowHeight);
      }
    }
  }, [virtualKeyboardHeight, windowHeight]);

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
          className={`modal-box relative p-0 bg-transparent ${className} ${getDimension()}} ${
            isSmallMobilePortrait && 'small-mobile-portrait'
          }`}
          style={{
            borderRadius:
              noBorderRadius || showFullScreen || isSmallMobile ? 0 : '1rem'
          }}
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
      {windowHeight && (
        <div
          className="modal"
          style={{
            height: modalHeight
          }}
        >
          <div
            className={`modal-with-close-button w-fit h-fit p-[1px] rounded overflow-hidden ${
              theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
            }`}
            style={{
              borderRadius:
                noBorderRadius === false || !showFullScreen || isSmallMobile
                  ? '1rem'
                  : 0
            }}
          >
            <div
              ref={modalRef}
              className={`modal-box relative p-0 bg-transparent ${
                !className?.includes('max-w') ? 'max-w-fit' : ''
              } ${className}`}
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
                  className={`absolute ${buttonPosition} cursor-pointer hover:text-red-300 p-2 rounded-xl duration-300 ease ${
                    theme === 'dark' ? 'hover:bg-zinc-600' : 'hover:bg-gray-200'
                  } `}
                  onClick={onClose ?? undefined}
                >
                  <span>
                    <XIcon width={22} height={22} />
                  </span>
                </label>
              )}
              {children}
            </div>
          </div>
        </div>
      )}
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
