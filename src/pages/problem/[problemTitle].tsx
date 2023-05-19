import { Suspense, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { useAppSelector } from '@/hooks/hooks';
import { Problem } from '@/types/dataTypes';
import ProblemDetail from '@/components/problems/ProblemDetail';
import classes from '@/styles/ProblemDetailPage.module.scss';
import ProblemEditor from '@/components/problems/ProblemEditor';
import Loading from '@/components/reusables/Loading';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState('prompt');

  const prompts = selectedProblem.prompts
    ? selectedProblem.prompts
    : {
        python: '',
        javascript: ''
      };

  return (
    <Suspense fallback={<Loading />}>
      {selectedProblem && (
        <div
          className={`${classes['problem-detail-page']} ${
            classes[`problem-detail-page--${theme}`]
          }`}
        >
          <div className={`${classes.detail} ${classes[`detail--${theme}`]}`}>
            <ul className={`${classes.tabs} ${classes[`tabs--${theme}`]}`}>
              <li
                className={`rounded-tl-md ${
                  activeTab === 'prompt' ? 'bg-accent' : ''
                } ${
                  activeTab === 'prompt' && theme == 'light' ? 'text-white' : ''
                }`}
                onClick={() => setActiveTab('prompt')}
              >
                Prompt
              </li>
              <li
                className={`${activeTab === 'solution' ? 'bg-accent' : ''} ${
                  activeTab === 'solution' && theme == 'light'
                    ? 'text-white'
                    : ''
                }`}
                onClick={() => setActiveTab('solution')}
              >
                Solutions
              </li>
            </ul>
            <div className={classes.description}>
              <ProblemDetail tab={activeTab} problem={selectedProblem} />
            </div>
          </div>
          <div className={`${classes.working} ${classes[`working--${theme}`]}`}>
            <ProblemEditor prompts={prompts} title={selectedProblem.title!} />
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
