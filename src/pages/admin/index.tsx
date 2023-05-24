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
// import useSort from '@/hooks/useSort';
import Alert from '@/components/reusables/Alert';
import classes from '../../styles/AdminDashBoard.module.scss';

type AdminDashBoardProps = {
  titles: string[];
  actionBar?: ReactNode;
};

const AdminDashBoard: React.FC<AdminDashBoardProps> = ({ titles }) => {
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
        <Button>
          <Link href="/admin/add">Add problem</Link>
        </Button>
        {/* <Button>
          <Link href="/problems">Edit problem</Link>
        </Button> */}
        <TitleList
          titles={titles}
          firstIconText="Edit"
          secondIconText="Test"
          firstIconAction={handleSelectTitle as () => Promise<void>}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const titles = await getAllTitles();

  return {
    props: { titles },
    revalidate: 3600
  };
};

export default AdminDashBoard;
