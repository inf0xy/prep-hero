import { GetStaticProps, GetStaticPaths } from 'next';
import { useMediaQuery } from 'react-responsive';
import { getAllTitles, getSelectedProblem } from '@/helpers/problem-api-util';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleSavedList } from '@/store';
import { Problem } from '@/types/dataTypes';
import ProblemDetailPageMobile from '@/components/reusables/codeEditor/ProblemDetailPageMobile';
import ProblemDetailPageDesktop from '@/components/reusables/codeEditor/ProblemDetailPageDesktop';
import SavedList from '@/components/problems/SavedList';
import Drawer from '@/components/reusables/Drawer';

type ProblemDetailPageProps = {
  selectedProblem: Problem;
};

const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  selectedProblem
}) => {
  const { savedListOpen } = useAppSelector((state) => state.navigate);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className='h-fit max-h-fit'>
      <Drawer
        direction="left"
        showCloseButton={true}
        isOpen={savedListOpen}
        closeDrawer={() => dispatch(toggleSavedList())}
      >
        <SavedList />
      </Drawer>
      {selectedProblem &&
        (!isMobile ? (
          <ProblemDetailPageDesktop selectedProblem={selectedProblem} />
        ) : (
          <ProblemDetailPageMobile selectedProblem={selectedProblem} />
        ))}
    </div>
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
  let titles = [];
  try {
    const result = await getAllTitles();
    titles = result.titles;
  } catch (err: any) {
    console.error(err);
  } finally {
    const paths = titles.map((title: string) => ({
      params: { problemTitle: title }
    }));
    return {
      paths,
      fallback: 'blocking'
    };
  }
};

export default ProblemDetailPage;
