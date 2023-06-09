import { useState, ReactNode, MouseEventHandler } from 'react';
import Portal from './Portal';

import FullScreenButton from './codeEditor/FullScreenButton';

type ModalProps = {
  children: ReactNode;
  id: string;
  className?: string;
  type?: undefined | 'close-button';
  buttonSize?: string;
  onClose?: MouseEventHandler<HTMLLabelElement> | undefined | null;
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
  fullScreenToggle,
  showCloseButton
}) => {
  const [fullScreen, setFullScreen] = useState(false);

  const modalStyle = {
    width: fullScreen ? '100vw' : '70vw',
    height: fullScreen ? '100vh' : '60vh'
  };

  const modalWithoutCloseButton = (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label
          className={`modal-box relative p-0 max-w-fit ${className}`}
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
