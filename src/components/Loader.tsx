const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-primary-600 border-b-purple"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
