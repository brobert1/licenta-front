import { useState, useEffect } from 'react';
import { Button, Video } from '@components';
import { Input } from '@components/Fields';
import { useStudyContext } from '@contexts/StudyContext';
import { useMutation } from '@hooks';
import { updateStudyChapter } from '@api/client';

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
          <label className="text-sm text-gray-300 font-medium">YouTube Video URL</label>
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full bg-tertiary text-white border border-white/10 rounded p-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
            placeholder="https://www.youtube.com/watch?v=_V6W5MhpHXQ&t=500s"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            onClick={handleClearVideo}
            className="px-3 py-2 text-xs bg-transparent text-gray-400 hover:text-white transition-colors duration-200"
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
            <Video src={videoUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTab;
