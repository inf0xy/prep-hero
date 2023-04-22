import { GetStaticProps } from 'next';
import { getAllProblems } from '@/helpers/problem-api-util';
import { useState, useEffect } from 'react';
import ProblemList from '@/components/problems/ProblemList';
import { Problem } from '@/types/dataTypes';
import classes from '../styles/ProblemsPage.module.css';

import axios from 'axios';

interface AllProblemsPageProps {
  problems: Problem[];
}

const AllProblemsPage: React.FC<AllProblemsPageProps> = ({ problems }) => {

  return (
    <section className={classes['problems-page']}>
      <ProblemList problems={problems} />
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const problems = await getAllProblems(1);
  return {
    props: { problems },
    revalidate: 3600
  };
};

export default AllProblemsPage;
