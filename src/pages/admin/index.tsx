import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getProblems } from '@/helpers/problem-api-util';
import Link from 'next/link';
import classes from '../../styles/AdminDashBoard.module.css';
import ProblemList from '@/components/problems/ProblemList';
import { Problem } from '@/types/dataTypes';
import useSort from '@/hooks/useSort';
type AdminDashBoardProps = {
  problems: Problem[];
};

const AdminDashBoard: React.FC<AdminDashBoardProps> = ({ problems }) => {
  const [currentProblems, setCurrentProblems] = useState(problems);
  const handleSort = useSort(problems, setCurrentProblems);

  return (
    <div className={classes['admin-dashboard']}>
      <Link href="/admin/add" className={classes['create-button']}>
        Add problem
      </Link>
      <ProblemList onSort={handleSort} problems={currentProblems} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const problems = await getProblems(1, {
    category: '',
    difficulty: '',
    tags: [],
    companies: [],
    text: ''
  });

  return {
    props: { problems },
    revalidate: 3600
  };
};

export default AdminDashBoard;
