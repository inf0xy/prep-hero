import { useState } from 'react';
import { getAllTitles } from '@/helpers/problem-api-util';
import { useAppSelector } from '@/hooks/hooks';
import { useEffect } from 'react';
import { NotificationType } from '@/types/dataTypes';
import ShuffleIcon from '../icons/ShuffleIcon';
import { useRouter } from 'next/router';
import Alert from './Alert';
import Button from './Button';
import variables from '@/styles/variables.module.scss';

const ShuffleButton = () => {
  const { allProblemsCount } = useAppSelector((state) => state.problems);
  const [titleList, setTitleList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const fetchTitles = async () => {
      const { titles } = await getAllTitles();
      setTitleList(titles);
    };

    try {
      fetchTitles();
    } catch (err: any) {
      setNotification({ status: 'error', message: 'Something went wrong' });
      setShowAlert(true);
    }
  }, []);

  const handleGetRandomProblem = () => {
    const randomNumber =
      Math.floor(Math.random() * (allProblemsCount - 1 + 1)) + 1;
    if (randomNumber <= titleList.length && titleList[randomNumber]) {
      const randomProblemTitle = titleList[randomNumber];
      router.push(`/problem/${randomProblemTitle}`);
    }
  };

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
        <ShuffleIcon width={20} height={20} />
      </Button>
    </>
  );
};

export default ShuffleButton;
