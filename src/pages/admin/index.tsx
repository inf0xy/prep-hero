import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import { getProblems } from '@/helpers/problem-api-util';
import { Problem } from '@/types/dataTypes';
import ProblemList from '@/components/problems/ProblemList';
import Button from '@/components/reusables/Button';
import useSort from '@/hooks/useSort';
import classes from '../../styles/AdminDashBoard.module.scss';

type AdminDashBoardProps = {
  problems: Problem[];
  count: number;
};

const AdminDashBoard: React.FC<AdminDashBoardProps> = ({ problems, count }) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const handleSort = useSort(problems, setCurrentProblems);
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`${classes['admin-dashboard']} ${
        classes[`admin-dashboard--${theme}`]
      }`}
    >
      <Button>
        <Link href="/admin/add">
          Add problem
        </Link>
      </Button>
      <Button>
        <Link href="/problems">
          Edit problem
        </Link>
      </Button>
      {/* <ProblemList onSort={handleSort} problems={currentProblems} /> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const {count, problems} = await getProblems(1, {
    listName: '',
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

  return {
    props: { problems, count },
    revalidate: 3600
  };
};

export default AdminDashBoard;
