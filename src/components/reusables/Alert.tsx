import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Alert.module.css';
import CircleX from '@/components/icons/CircleX';
import { selectedColors } from '@/helpers/extraStyles';

type AlertProps = {
  children: ReactNode;
  status: 'success' | 'error' | 'warning';
  onClose: Dispatch<SetStateAction<boolean>>;
};

const Alert: React.FC<AlertProps> = ({ children, status, onClose }) => {
  return (
    <div className={classes.alert} style={{ backgroundColor: selectedColors[status] }}>
      {children}
      <button onClick={() => onClose(false)}>
        <CircleX />
      </button>
    </div>
  );
};

export default Alert;
