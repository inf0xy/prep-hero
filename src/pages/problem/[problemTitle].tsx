import { Suspense } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { Problem } from '@/types/dataTypes';
import ProblemDetail from '@/components/problems/ProblemDetail';
import classes from '@/styles/ProblemDetailPage.module.scss';
import { useAppSelector } from '@/hooks/hooks';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <Suspense fallback={`Loading...`}>
      {selectedProblem && (
        <div
          className={`${classes['problem-detail-page']} ${
            classes[`problem-detail-page--${theme}`]
          }`}
        >
          <div className={classes.detail}>
            <ProblemDetail problem={selectedProblem} />
          </div>
          <div className={classes.working}>
            <ProblemDetail problem={selectedProblem} />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const problemTitle = context.params!.problemTitle as string;
  const selectedProblem = await getSelectedProblem(problemTitle);
  return {
    props: {
      selectedProblem
    },
    revalidate: 30
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await getAllTitles();
  const paths = titles.map((title: string) => ({
    params: { problemTitle: title }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export default ProblemDetailPage;
