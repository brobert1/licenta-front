import { Button } from '@components';
import { usePreview } from '@hooks';

const PreviewBanner = () => {
  const { exitPreview } = usePreview();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-accent px-6 py-3 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2 text-sm text-white">
        <i className="fas fa-eye opacity-80"></i>
        <span className="font-semibold">Preview Mode</span>
        <span className="hidden sm:inline opacity-80">— Viewing as Client</span>
      </div>
      <Button
        onClick={exitPreview}
        className="bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-opacity-90 transition-opacity"
      >
        Exit Preview
      </Button>
    </div>
  );
};

export default PreviewBanner;
