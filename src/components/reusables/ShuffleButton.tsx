import { useState } from 'react';
import { NotificationType } from '@/types/dataTypes';
import useRandomQuestion from '@/hooks/useRandomQuestion';
import ShuffleIconColor from '../icons/ShuffleIconColor';
import Alert from './Alert';
import Button from './Button';
import variables from '@/styles/variables.module.scss';

const ShuffleButton = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const handleGetRandomProblem = useRandomQuestion(
    setShowAlert,
    setNotification
  );

  return (
    <>
      {showAlert && (
        <Alert
          status={notification?.status!}
          setNotification={setNotification}
          onClose={() => setShowAlert(false)}
        >
          {notification?.message}
        </Alert>
      )}
      <Button
        onClick={handleGetRandomProblem}
        extraStyle={{
          height: '3rem',
          borderRadius: '5px',
          backgroundColor: 'transparent',
          border: `solid ${variables.colorWarning100} 1px`
        }}
      >
        <ShuffleIconColor />
      </Button>
    </>
  );
};

export default ShuffleButton;
