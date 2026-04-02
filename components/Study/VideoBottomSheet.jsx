import { Button, NoSsr, VideoPlayer } from '@components';
import { useLockBodyScroll } from '@hooks';
import { classnames } from '@lib';
import { useEffect, useState } from 'react';

const VideoBottomSheet = ({ isOpen, onClose, onVideoRef, remountKey, videoUrl }) => {
  const [isClosing, setIsClosing] = useState(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handlePanelAnimationEnd = (e) => {
    if (!isClosing || e.target !== e.currentTarget) return;
    setIsClosing(false);
    onClose();
  };

  return (
    <div
      aria-hidden={!isOpen}
      aria-modal={isOpen}
      className={classnames(
        'fixed inset-0 z-50 flex flex-col justify-end',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      role="dialog"
    >
      {isOpen && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}
      <div
        className={classnames(
          'relative w-full rounded-t-3xl bg-secondary border-t border-border shadow-2xl',
          isClosing && 'animate-slide-down',
          isOpen && !isClosing && 'animate-slide-up'
        )}
        onAnimationEnd={handlePanelAnimationEnd}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-tertiary" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3">
          <span className="text-sm font-semibold text-primary">Chapter Video</span>
          <Button
            aria-label="Close video"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-border text-primary hover:text-primary hover:bg-surface/80 transition-colors"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark text-sm" />
          </Button>
        </div>
        <div className="px-4 pb-6">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border border-border/50 bg-black">
            {videoUrl && (
              <NoSsr>
                <VideoPlayer key={remountKey ?? videoUrl} src={videoUrl} onVideoRef={onVideoRef} />
              </NoSsr>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBottomSheet;
