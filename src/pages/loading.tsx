import Loading from '@/components/reusables/Loading';

const LoadingPage = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 7rem)' }}
    >
      <Loading />
    </div>
  );
};

export default LoadingPage;
