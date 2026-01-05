const detectDevice = () => {
  if (typeof window === 'undefined') {
    return { isSafari: false, isMobile: false, isTablet: false };
  }

  const ua = navigator.userAgent.toLowerCase();

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);

  return { isSafari, isMobile, isTablet };
};

// For Analysis Engine: WASM on desktop non-Safari, ASM on mobile/tablet/Safari
export const getEngineType = () => {
  const { isSafari, isMobile, isTablet } = detectDevice();

  if (isSafari || isMobile || isTablet) {
    return 'asm';
  }

  return 'wasm';
};

// For Bot Engine: Stockfish WASM on desktop, ASM on Safari/Mobile
export const getBotEngineType = () => {
  const { isSafari, isMobile, isTablet } = detectDevice();

  // Use ASM for Safari and mobile devices (WASM threading issues)
  if (isSafari || isMobile || isTablet) {
    return 'asm';
  }

  // Use Stockfish 17.1 WASM with NNUE for maximum strength
  return 'wasm';
};
