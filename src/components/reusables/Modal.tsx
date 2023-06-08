import {
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  RefObject
} from 'react';
import Portal from './Portal';

type ModalProps = {
  children: ReactNode;
  id: string;
  className?: string;
  type?: undefined | 'close-button';
  onClose?: MouseEventHandler<HTMLLabelElement> | undefined | null;
  editorRef?: RefObject<HTMLDivElement>
};

const Modal: React.FC<ModalProps> = ({
  children,
  id,
  className,
  type,
  onClose,
  editorRef
}) => {
  const [fullScreen, setFullScreen] = useState(false);

//   useEffect(() => {
//     const handler = () => setFullScreen(!fullScreen);

// console.log('editor ref button', document.querySelector(
//   "button[data-name='fullscreen']"));

//     if (editorRef!.current) {
//       const fullscreenButton = editorRef!.current.querySelector(
//         "button[data-name='fullscreen']"
//       );
// console.log('FULL SCREEN BUTTON  ', fullscreenButton);
//       if (fullscreenButton) {
//         fullscreenButton.addEventListener('click', handler as any, true);

//         return () => {
//           fullscreenButton.removeEventListener('click', handler as any);
//         };
//       }
//     }
//   }, [editorRef, fullScreen]);

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
            !className?.includes('max-w') ? 'max-w-fit' : ''
          } ${className}`}
          style={
            fullScreen
              ? { minWidth: '100vw', minHeight: '100vh' }
              : {
                  maxWidth: '70vw',
                  maxHeight: ' 60vh',
                  width: '70vw',
                  height: '60vh'
                }
          }
        >
          <label
            htmlFor={id}
            className={`btn btn-circle absolute right-8 top-7 bg-[#474747]  hover:bg-[#404040] border-0`}
            onClick={onClose ?? undefined}
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
