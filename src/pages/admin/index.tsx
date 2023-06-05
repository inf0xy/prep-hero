import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setSelectedProblem } from '@/store';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { NotificationType, Problem } from '@/types/dataTypes';
import Button from '@/components/reusables/Button';
import TitleList from '@/components/reusables/TitleList';
import BreakerIcon from '@/components/icons/BreakerIcon';
import EditIcon from '@/components/icons/EditIcon';
// import useSort from '@/hooks/useSort';
import Alert from '@/components/reusables/Alert';
import classes from '../../styles/AdminDashBoard.module.scss';


type AdminDashBoardProps = {
  titles: string[];
  testTitles: string[];
  actionBar?: ReactNode;
};

const AdminDashBoard: React.FC<AdminDashBoardProps> = ({ titles, testTitles }) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSelectTitle = async (title: string) => {
    try {
      const result = await getSelectedProblem(title);
      dispatch(setSelectedProblem(result));
      router.push('/admin/edit');
    } catch (err: any) {
      setShowAlert(true);
      setNotification({ status: 'error', message: err.message });
    }
  };

  const handleSelectTest = (title: string) => {
    router.push(`/admin/tests/${title}`);
  };

  const actionBar = (
    <div className='flex w-full px-12 items-center'>
      <p className='text-[1.8rem] pt-1'>Total: {titles.length}</p>
      <Button extraStyle={{
        height: '3rem',
        marginLeft: 'auto',
        justifySelf: 'flex-end',
        color: 'white'
      }}>
        <Link href="/admin/add">Add problem</Link>
      </Button>
    </div>
  );

  return (
    <>
      {showAlert && (
        <Alert
          status="error"
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification!.message}
        </Alert>
      )}
      <div
        className={`${classes['admin-dashboard']} ${
          classes[`admin-dashboard--${theme}`]
        }`}
      >
        <TitleList
          listType='problems'
          titles={titles}
          testTitles={testTitles}
          firstIconText="Edit"
          secondIconText="Test"
          firstIcon={<BreakerIcon />}
          secondIcon={<EditIcon />}
          firstIconAction={handleSelectTitle as () => Promise<void>}
          secondIconAction={handleSelectTest as () => Promise<void>}
          actionBar={actionBar}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { titles, testTitles } = await getAllTitles();

  return {
    props: { titles, testTitles },
    revalidate: 3600
  };
};

export default AdminDashBoard;
