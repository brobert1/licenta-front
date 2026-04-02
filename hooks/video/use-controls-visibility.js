import { useCallback, useEffect, useRef, useState } from 'react';

const HIDE_DELAY_MS = 2500;
const MOUSELEAVE_DELAY_MS = 400;

const useControlsVisibility = (playing) => {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);
  const playingRef = useRef(playing);

  // Keep playingRef in sync so show/hide callbacks don't need playing as a dep
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const show = useCallback(() => {
    setVisible(true);
    clearTimeout(timerRef.current);
    if (playingRef.current) {
      timerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
    }
  }, []);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), MOUSELEAVE_DELAY_MS);
  }, []);

  // When paused: always show and cancel any pending hide timer
  // When playing: start the initial auto-hide countdown
  useEffect(() => {
    if (!playing) {
      clearTimeout(timerRef.current);
      setVisible(true);
    } else {
      timerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
    }

    return () => clearTimeout(timerRef.current);
  }, [playing]);

  return { visible, show, hide };
};

export default useControlsVisibility;
