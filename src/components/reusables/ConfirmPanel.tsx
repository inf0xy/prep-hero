import Modal from './Modal';
import classes from './ConfirmPanel.module.css';
import Button from './Button';
import InfoIcon from '@/components/icons/InfoIcon';
import { grayColors } from '@/helpers/extraStyles';

type ConfirmPanelProps = {
  headerText: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmPanel: React.FC<ConfirmPanelProps> = ({
  headerText,
  message,
  confirmText,
  cancelText,
  onCancel,
  onConfirm
}) => {
  return (
    <Modal type="clear" onClose={onCancel}>
      {/* <div className={classes['confirm-panel']}>
        <div className={classes['confirm-panel__top']}>
          <div className={classes['confirm-panel__icon-container']}>
            <div className={classes['confirm-panel__icon-wrapper']}>
              <span className={classes['confirm-panel__icon']}>
                <InfoIcon width={40} height={40} />
              </span>
            </div>
          </div>
          <div className={classes['confirm-panel__message']}>
            <h3>{headerText}</h3>
            <p>{message}</p>
          </div>
        </div>
        <div className={classes['confirm-panel__actions']}>
          <Button
            color={grayColors[400]}
            onClick={onCancel}
            extraStyle={{ padding: '1rem 2.3rem' }}
          >
            {cancelText}
          </Button>
          <Button color="secondary-200" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div> */}
      <div className="card min-w-[50rem] bg-[#333] shadow-xl px-[1rem] ">
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
          <div className="card-actions justify-end space-x-[1.5rem]">
            <button
              className="btn btn-lg text-[1.5rem] bg-gray-600 hover:bg-gray-600 hover:opacity-70 border-0 normal-case"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className="btn btn-lg bg-[#009989] hover:opacity-70 hover:bg-[#009989]  border-0 text-[1.5rem] btn-primary normal-case"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPanel;
