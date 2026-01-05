import { Button } from '@components';
import { usePreview } from '@hooks';

const PreviewBanner = () => {
  const { exitPreview } = usePreview();

  return (
    <div className="bg-accent text-white py-3 px-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <i className="fas fa-eye"></i>
        <strong>Preview Mode</strong>
        <span className="hidden sm:inline">- Viewing as Client</span>
      </div>
      <Button
        onClick={exitPreview}
        className="bg-primary text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors font-medium"
      >
        Exit Preview
      </Button>
    </div>
  );
};

export default PreviewBanner;
