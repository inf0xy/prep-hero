import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDuration } from '@/store';
import { Problem } from '@/types/dataTypes';
import ProblemDetail from '@/components/problems/ProblemDetail';
import classes from '@/styles/ProblemDetailPage.module.scss';
import ProblemEditor from '@/components/problems/ProblemEditor';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState('prompt');
  const [reviewCode, setReviewCode] = useState<
    { code: string; language: string } | undefined
  >(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDuration(0));
  }, []);

  const prompts = selectedProblem.prompts
    ? selectedProblem.prompts
    : {
        python: '',
        javascript: ''
      };

  return (
    <>
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
                className={`${activeTab === 'solutions' ? 'bg-accent' : ''} ${
                  activeTab === 'solutions' && theme == 'light'
                    ? 'text-white'
                    : ''
                }`}
                onClick={() => setActiveTab('solutions')}
              >
                Solutions
              </li>
              <li
                className={`${activeTab === 'submissions' ? 'bg-accent' : ''} ${
                  activeTab === 'submissions' && theme == 'light'
                    ? 'text-white'
                    : ''
                }`}
                onClick={() => setActiveTab('submissions')}
              >
                Submissions
              </li>
            </ul>
            <div className={classes.description}>
              <ProblemDetail
                tab={activeTab}
                problem={selectedProblem}
                setReviewCode={setReviewCode}
              />
            </div>
          </div>
          <div className={`${classes.working} ${classes[`working--${theme}`]}`}>
            <ProblemEditor
              prompts={prompts}
              title={selectedProblem.title!}
              listNames={selectedProblem.list_names!}
              reviewCode={reviewCode}
              setReviewCode={setReviewCode}
            />
          </div>
        </div>
      )}
    </>
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
  const { titles } = await getAllTitles();

  const paths = titles.map((title: string) => ({
    params: { problemTitle: title }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export default ProblemDetailPage;
