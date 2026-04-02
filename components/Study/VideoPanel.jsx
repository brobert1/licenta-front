import { NoSsr, VideoPlayer } from '@components';
import { classnames } from '@lib';
import { useVideoPanel } from '@hooks';

const VideoPanel = ({ remountKey, videoUrl, prevVideoUrl, videoRef }) => {
  const { displayVideoUrl, isExpanded } = useVideoPanel(videoUrl, prevVideoUrl);

  return (
    <div
      className={classnames(
        'origin-top overflow-hidden transform-gpu transition-all duration-700 ease-in-out motion-reduce:transition-none motion-reduce:transform-none',
        isExpanded
          ? 'max-h-screen translate-y-0 scale-100 pb-3 opacity-100'
          : 'max-h-0 -translate-y-2 scale-95 pb-0 opacity-0'
      )}
    >
      <div className="transform-gpu">
        <div
          className={classnames(
            'transition-opacity duration-700 ease-in-out motion-reduce:transition-none',
            isExpanded ? 'opacity-100' : 'opacity-0'
          )}
        >
          {displayVideoUrl && (
            <NoSsr>
              <VideoPlayer
                key={remountKey ?? displayVideoUrl}
                src={displayVideoUrl}
                onVideoRef={videoRef}
              />
            </NoSsr>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
