import { useCallback, useEffect, useRef, useState } from 'react';

const usePlayerControls = (player) => {
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [textTracks, setTextTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [volume, setVolume] = useState(1);
  const isScrubbingRef = useRef(false);
  const isSeekingRef = useRef(false);
  const lastVolumeBeforeMuteRef = useRef(1);

  useEffect(() => {
    if (!player) return;

    (async () => {
      try {
        setDuration((await player.getDuration()) || 0);
      } catch (_) {
        /* ignore */
      }

      try {
        const v = await player.getVolume();
        const vol = typeof v === 'number' ? v : 1;
        setVolume(vol);
        if (vol > 0.05) lastVolumeBeforeMuteRef.current = vol;
      } catch (_) {
        /* ignore */
      }

      try {
        setPlaying(!(await player.getPaused()));
      } catch (_) {
        /* ignore */
      }

      try {
        const tracks = await player.getTextTracks();
        const captionTracks = tracks.filter((t) => t.kind === 'subtitles' || t.kind === 'captions');
        setTextTracks(captionTracks);
        const showing = captionTracks.find((t) => t.mode === 'showing');
        if (showing) setActiveTrack(showing);
      } catch (_) {
        /* ignore */
      }
    })();

    const onTime = ({ seconds }) => {
      if (!isScrubbingRef.current && !isSeekingRef.current) setPosition(seconds);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    player.on('timeupdate', onTime);
    player.on('play', onPlay);
    player.on('pause', onPause);

    return () => {
      player.off('timeupdate', onTime);
      player.off('play', onPlay);
      player.off('pause', onPause);
    };
  }, [player]);

  const startPlayback = useCallback(() => {
    player?.play().catch(() => {});
  }, [player]);

  const togglePlay = useCallback(() => {
    if (!player) return;
    if (playing) player.pause().catch(() => {});
    else player.play().catch(() => {});
  }, [player, playing]);

  const handleScrub = useCallback(
    async (e) => {
      const next = Number(e.target.value);
      setPosition(next);
      if (!player) return;
      isSeekingRef.current = true;
      try {
        await player.setCurrentTime(next);
      } finally {
        isSeekingRef.current = false;
      }
    },
    [player]
  );

  const onScrubStart = useCallback(() => {
    isScrubbingRef.current = true;
  }, []);
  const onScrubEnd = useCallback(() => {
    isScrubbingRef.current = false;
  }, []);

  const isMuted = volume < 0.05;

  const toggleMute = useCallback(() => {
    if (!player) return;
    if (isMuted) {
      const restore = lastVolumeBeforeMuteRef.current > 0.05 ? lastVolumeBeforeMuteRef.current : 1;
      player.setVolume(restore).catch(() => {});
      setVolume(restore);
    } else {
      lastVolumeBeforeMuteRef.current = Math.max(volume, 0.15);
      player.setVolume(0).catch(() => {});
      setVolume(0);
    }
  }, [isMuted, player, volume]);

  const handleVolumeChange = useCallback(
    (e) => {
      const val = Number(e.target.value);
      player?.setVolume(val).catch(() => {});
      setVolume(val);
      if (val > 0.05) lastVolumeBeforeMuteRef.current = val;
    },
    [player]
  );

  const toggleSubtitles = useCallback(() => {
    if (!player || textTracks.length === 0) return;
    if (activeTrack) {
      player.disableTextTrack().catch(() => {});
      setActiveTrack(null);
    } else {
      const track = textTracks[0];
      player.enableTextTrack(track.language, track.kind).catch(() => {});
      setActiveTrack(track);
    }
  }, [player, textTracks, activeTrack]);

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (Math.min(position, duration) / duration) * 100)) : 0;

  return {
    activeTrack,
    duration,
    handleScrub,
    handleVolumeChange,
    isMuted,
    onScrubEnd,
    onScrubStart,
    playing,
    position,
    progressPercent,
    startPlayback,
    textTracks,
    toggleMute,
    togglePlay,
    toggleSubtitles,
    volume,
  };
};

export default usePlayerControls;
