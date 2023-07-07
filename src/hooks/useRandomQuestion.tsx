import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from './hooks';
import { NotificationType } from '@/types/dataTypes';
import { getAllTitles } from '@/helpers/problem-api-util';

const useRandomQuestion: (
  setShowAlert: Dispatch<SetStateAction<boolean>>,
  setNotification: Dispatch<SetStateAction<NotificationType | null>>
) => () => void = (setShowAlert, setNotification) => {
  const { allProblemsCount } = useAppSelector((state) => state.problems);
  const [titleList, setTitleList] = useState([]);
  const [lastNumber, setLastNumber] = useState<number | null>(null);

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
  }, [setNotification, setShowAlert]);

  useEffect(() => {
    if (titleList.length > 0) {
      const randomNumber = Math.floor(Math.random() * titleList.length);
      setLastNumber(randomNumber);
    }
  }, [titleList]);

  const handleGetRandomProblem = useCallback(() => {
    let randomNumber = Math.floor(Math.random() * allProblemsCount);

    while (lastNumber && randomNumber === lastNumber) {
      randomNumber = Math.floor(Math.random() * allProblemsCount);
    }

    setLastNumber(randomNumber);

    if (randomNumber < titleList.length && titleList[randomNumber]) {
      const randomProblemTitle = titleList[randomNumber];
      if (router.pathname.match(/\/problem\/.*/)) {
        window.location.assign(`/problem/${randomProblemTitle}`);
      } else {
        router.push(`/problem/${randomProblemTitle}`);
      }
    }
  }, [allProblemsCount, lastNumber, router, titleList]);

  return handleGetRandomProblem;
};

export default useRandomQuestion;
