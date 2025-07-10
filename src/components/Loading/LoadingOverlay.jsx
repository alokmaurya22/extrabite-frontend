import { useLoading } from '../../context/LoadingContext';

const LoadingOverlay = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg">Thankyou for your patience ...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
