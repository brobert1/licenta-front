import { updateStudyChapter } from '@api/client';
import { Button, NoSsr, VideoPlayer } from '@components';
import { Input } from '@components/Fields';
import { useStudyContext } from '@contexts/StudyContext';
import { useMutation } from '@hooks';
import { useEffect, useState } from 'react';

const VideoTab = () => {
  const { study, activeChapter } = useStudyContext();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (activeChapter?.video) {
      setVideoUrl(activeChapter.video);
    } else {
      setVideoUrl('');
    }
  }, [activeChapter?._id]);

  const mutation = useMutation(updateStudyChapter, {
    invalidateQueries: `/studies/${study?._id}`,
  });

  const hasChanges = videoUrl !== (activeChapter?.video || '');

  const handleSaveVideo = async () => {
    await mutation.mutateAsync({
      id: activeChapter._id,
      video: videoUrl || null,
    });
  };

  const handleClearVideo = async () => {
    setVideoUrl('');
    await mutation.mutateAsync({
      id: activeChapter._id,
      video: null,
    });
  };

  return (
    <div className="p-3">
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm text-muted font-medium">Vimeo video URL</label>
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full bg-tertiary text-primary border border-border rounded p-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="https://vimeo.com/123456789#t=2m30s"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            onClick={handleClearVideo}
            className="px-3 py-2 text-xs bg-transparent text-muted hover:text-primary transition-colors duration-200"
            disabled={!videoUrl.trim() && !activeChapter?.video}
          >
            Clear
          </Button>
          <Button
            onClick={handleSaveVideo}
            className="px-4 py-2 text-xs bg-accent text-white rounded hover:bg-accent/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasChanges || mutation.isLoading}
          >
            {mutation.isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
        {videoUrl && (
          <div className="mt-4">
            <NoSsr>
              <VideoPlayer key={`${activeChapter?._id}-${videoUrl}`} src={videoUrl} />
            </NoSsr>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTab;
