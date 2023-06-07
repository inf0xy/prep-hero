import Portal from './Portal';
import { useAppSelector } from '@/hooks/hooks';
import InfoIcon from '@/components/icons/InfoIcon';
import classes from './ConfirmPanel.module.scss';

type ConfirmPanelProps = {
  id: string;
  headerText: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void | Promise<void>;
  className?: string;
};

const ConfirmPanel: React.FC<ConfirmPanelProps> = ({
  id,
  headerText,
  message,
  confirmText,
  cancelText,
  onConfirm,
  className
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <>
      {typeof window !== 'undefined' && (
        <Portal container={document.body}>
          <input type="checkbox" id={id} className="modal-toggle" />
          <div className="modal">
            <div
              className={` modal-box p-0 ${classes['confirm-panel']} ${classes[`confirm-panel--${theme}`]}`}
            >
              <div
                className={`card z-[-1] h-56 min-w-[50vw] ${
                  theme === 'dark' ? 'bg-[#333]' : 'bg-white'
                } px-[1rem] ${className}`}
              >
                <div className={`card-body ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
                  <div className="flex space-x-[3rem] mt-[1rem] mx-[2rem] mb-[3rem]">
                    <div className={classes['confirm-panel__icon-container']}>
                      <div className={classes['confirm-panel__icon-wrapper']}>
                        <span className={classes['confirm-panel__icon']}>
                          <InfoIcon width={40} height={40} />
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title text-[1.7rem] mb-[2rem]">
                        {headerText}
                      </h2>
                      <p className="text-[1.6rem] leading-normal">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action mt-0 mb-10 pr-16 space-x-5">
                <label
                  htmlFor={id}
                  className="btn bg-gray-500 border-0 text-white text-[1.5rem] normal-case font-normal w-[9rem] h-[3.5rem]"
                >
                  {cancelText}
                </label>
                <label
                  htmlFor={id}
                  className="btn btn-accent text-white text-[1.5rem] normal-case font-normal w-[9rem] h-[3.5rem]"
                  onClick={onConfirm}
                >
                  {confirmText}
                </label>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default ConfirmPanel;
