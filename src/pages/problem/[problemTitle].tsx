import { GetServerSideProps } from 'next';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleSavedList } from '@/store';
import { Problem } from '@/types/dataTypes';
import ProblemDetailPageMobile from '@/components/reusables/codeEditor/ProblemDetailPageMobile';
import ProblemDetailPageDesktop from '@/components/reusables/codeEditor/ProblemDetailPageDesktop';
import SavedList from '@/components/problems/SavedList';
import Drawer from '@/components/reusables/Drawer';

import { getProblemByTitle } from '@/lib/database/problems';

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
    <div className="h-fit max-h-fit">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const problemTitle = context.params!.problemTitle as string;

  try {
    const selectedProblem = await getProblemByTitle(problemTitle as string);
    return {
      props: {
        selectedProblem
      }
    };
  } catch (err: any) {
    console.error(err);
    return {
      props: {
        error: 'An error occurred'
      }
    };
  }
};

export default ProblemDetailPage;
