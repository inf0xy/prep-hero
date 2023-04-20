import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProblemForm from './add';
import { useRouter } from 'next/router';
import classes from '../../styles/AdminDashBoard.module.css';

const AdminDashBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   // @ts-ignore
  //   if (!session || session.session.user.account_type !== 'admin') {
  //     router.replace('/auth/login');
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session]);

  return (
    <div className={classes['admin-dashboard']}>
      <Link href="/admin/add" className={classes['create-button']}>Add problem</Link>
    </div>
  );
};

export default AdminDashBoard;
