import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  modalBackgroundBlur,
  modalBackgroundClear
} from '@/helpers/extraStyles';

interface ModalProps {
  children: any;
  className?: string;
  type: 'clear' | 'blur';
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  className,
  type
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const backgroundStyle =
    type === 'clear' ? modalBackgroundClear : modalBackgroundBlur;


  return createPortal(
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        style={backgroundStyle}
      ></div>
      <div
        className={`fixed inset-0 m-auto rounded-lg w-fit h-fit max-h-screen overflow-y-auto text-gray-800 shadow-xl ${className}`}
      >
        <div>{children}</div>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
};

export default Modal;
