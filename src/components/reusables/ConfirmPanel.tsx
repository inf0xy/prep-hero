import Portal from './Portal';
import classes from './ConfirmPanel.module.css';
import InfoIcon from '@/components/icons/InfoIcon';

type ConfirmPanelProps = {
  id: string;
  headerText: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
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
  return (
    <>
      {typeof window !== 'undefined' && (
        <Portal container={document.body}>
          <input type="checkbox" id={id} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box max-w-fit p-0 bg-[#333]">
              <div className="card min-w-[50rem] bg-[#333] px-[1rem] ">
                <div className="card-body text-white">
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
                      <p className="text-[1.6rem]">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action mt-0 mb-10 pr-16 space-x-5">
                <label htmlFor={id} className='btn btn-lg bg-gray-500 text-white text-xl'>
                  {cancelText}
                </label>
                <label htmlFor={id} className="btn btn-lg btn-accent text-white text-xl " onClick={onConfirm}>
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
