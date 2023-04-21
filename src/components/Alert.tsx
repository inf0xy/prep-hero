import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Alert.module.css';
import CircleX from './icons/CircleX';

type AlertProps = {
  children: ReactNode;
  status: 'success' | 'error' | 'warning';
  onClose: Dispatch<SetStateAction<boolean>>;
};

const Alert: React.FC<AlertProps> = ({ children, status, onClose }) => {
  let selectedColor: string;
  if (status === 'success') {
    selectedColor = '#6fc88d';
  } else if (status === 'error') {
    selectedColor = '#f6385b';
  } else if (status === 'warning') {
    selectedColor = '#eea60c';
  }

  return (
    <div className={classes.alert} style={{ backgroundColor: selectedColor! }}>
      {children}
      <button onClick={() => onClose(false)}>
        <CircleX />
      </button>
    </div>
  );
};

export default Alert;
