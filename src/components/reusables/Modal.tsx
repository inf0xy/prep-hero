import { ReactNode } from 'react';
import Portal from './Portal';

type ModalProps = {
  children: ReactNode;
  id: string;
  className?: string;
  type?: undefined | 'close-button';
};

const Modal: React.FC<ModalProps> = ({ children, id, className, type }) => {
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
        <div className={`modal-box relative p-0 max-w-fit ${className}`}>
          <label
            htmlFor={id}
            className={`btn btn-circle absolute right-8 top-7 bg-[#474747]  hover:bg-[#404040] border-0`}
          >
            <span className="text-2xl">✕</span>
          </label>
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
