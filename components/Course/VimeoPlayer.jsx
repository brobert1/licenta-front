import { useCallback, useEffect, useRef, useState } from 'react';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const VimeoPlayer = ({ vimeoId, title, autoplay = false }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !vimeoId) return;

    let player;

    const init = async () => {
      const { default: Player } = await import('@vimeo/player');

      player = new Player(containerRef.current, {
        id: Number(vimeoId),
        controls: false,
        autoplay: false,
        title: false,
        byline: false,
        portrait: false,
        responsive: true,
        end_card: 0,
      });

      playerRef.current = player;

      player.on('loaded', async () => {
        setIsLoading(false);
        const dur = await player.getDuration();
        setDuration(dur);
        if (autoplay) {
          try {
            await player.play();
          } catch {
            // Browser blocked autoplay with sound — retry muted
            await player.setVolume(0);
            setIsMuted(true);
            await player.play();
          }
        }
      });

      player.on('play', () => {
        setIsPlaying(true);
        setHasStarted(true);
      });
      player.on('pause', () => setIsPlaying(false));
      player.on('ended', () => {
        setIsPlaying(false);
        setShowControls(true);
      });

      player.on('timeupdate', ({ seconds }) => {
        if (!isSeeking) setCurrentTime(seconds);
      });

      player.on('bufferstart', () => setIsLoading(true));
      player.on('bufferend', () => setIsLoading(false));
    };

    init();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [vimeoId]);

  const resetHideTimer = useCallback(() => {
    clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleMouseMove = useCallback(() => {
    if (isPlaying) resetHideTimer();
    else setShowControls(true);
  }, [isPlaying, resetHideTimer]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      clearTimeout(hideTimerRef.current);
      setShowControls(false);
    }
  }, [isPlaying]);

  const togglePlay = useCallback(
    async (e) => {
      e.stopPropagation();
      if (!playerRef.current) return;
      if (isPlaying) {
        await playerRef.current.pause();
      } else {
        await playerRef.current.play();
      }
    },
    [isPlaying]
  );

  const handleProgressClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!playerRef.current || !duration) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const time = ratio * duration;
      playerRef.current.setCurrentTime(time);
      setCurrentTime(time);
    },
    [duration]
  );

  const toggleMute = useCallback(
    async (e) => {
      e.stopPropagation();
      if (!playerRef.current) return;
      const next = !isMuted;
      setIsMuted(next);
      await playerRef.current.setVolume(next ? 0 : volume);
    },
    [isMuted, volume]
  );

  const handleVolumeChange = useCallback(async (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    await playerRef.current?.setVolume(val);
  }, []);

  const handleFullscreen = useCallback(async (e) => {
    e.stopPropagation();
    await playerRef.current?.requestFullscreen();
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const volumeIcon =
    isMuted || volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high';

  return (
    <div
      className="relative w-full h-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Vimeo iframe — SDK injects it here */}
      <div
        ref={containerRef}
        className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>div]:w-full [&>div]:h-full"
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none">
          <div className="w-10 h-10 border-2 border-tertiaryGold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Click-to-play overlay (transparent, covers video area above controls) */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
        style={{ bottom: '72px' }}
      />

      {/* Center play/pause flash icon */}
      {!isLoading && !isPlaying && (!autoplay || hasStarted) && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ bottom: '72px' }}
        >
          <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20">
            <i className="fa-solid fa-play text-white text-xl pl-1" />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        <div className="relative px-4 pt-8 pb-4 flex flex-col gap-3">
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="group/bar w-full h-1 bg-white/25 rounded-full cursor-pointer hover:h-1.5 transition-all duration-150"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-tertiaryGold rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-tertiaryGold rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-md" />
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex items-center gap-3">
            {/* Play / Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="text-white hover:text-tertiaryGold transition-colors w-8 h-8 flex items-center justify-center"
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-sm`} />
            </button>

            {/* Time */}
            <span className="text-white/70 text-xs font-landing tabular-nums select-none">
              {formatTime(currentTime)}
              <span className="mx-1 text-white/30">/</span>
              {formatTime(duration)}
            </span>

            {/* Title */}
            {title && (
              <span className="flex-1 text-white/60 text-xs font-landing truncate select-none">
                {title}
              </span>
            )}
            {!title && <div className="flex-1" />}

            {/* Volume */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={toggleMute}
                className="text-white hover:text-tertiaryGold transition-colors w-7 h-7 flex items-center justify-center"
              >
                <i className={`fa-solid ${volumeIcon} text-sm`} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-tertiaryGold cursor-pointer appearance-none bg-white/25 rounded-full"
              />
            </div>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="text-white hover:text-tertiaryGold transition-colors w-7 h-7 flex items-center justify-center"
            >
              <i className="fa-solid fa-expand text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VimeoPlayer;
