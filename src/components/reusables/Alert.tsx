import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Alert.module.scss';
import CircleX from '@/components/icons/CircleX';
import { selectedColors } from '@/helpers/extraStyles';
import { NotificationType } from '@/types/dataTypes';

type AlertProps = {
  children: ReactNode;
  status: 'success' | 'error' | 'warning';
  onClose: Dispatch<SetStateAction<boolean>>;
  setNotification: Dispatch<SetStateAction<NotificationType| null>>;
};

const Alert: React.FC<AlertProps> = ({
  children,
  status,
  onClose,
  setNotification
}) => {
  return (
    <div
      className={classes.alert}
      style={{ backgroundColor: selectedColors[status] }}
    >
      {children}
      <button
        onClick={() => {
          onClose(false);
          setNotification({ status: undefined, message: undefined });
        }}
      >
        <CircleX />
      </button>
    </div>
  );
};

export default Alert;
