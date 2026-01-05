import { useEffect, useState } from 'react';
import { DEFAULT_MEMORY, DEFAULT_NUM_LINES, ENGINE_STORAGE_KEYS } from '@chess/constants/engine';

const useEngineSettings = () => {
  const [numLines, setNumLines] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_NUM_LINES;
    const saved = localStorage.getItem(ENGINE_STORAGE_KEYS.numLines);
    return saved ? parseInt(saved, 10) : DEFAULT_NUM_LINES;
  });

  const [memory, setMemory] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_MEMORY;
    const saved = localStorage.getItem(ENGINE_STORAGE_KEYS.memory);
    return saved ? parseInt(saved, 10) : DEFAULT_MEMORY;
  });

  // Persist numLines to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ENGINE_STORAGE_KEYS.numLines, numLines.toString());
    }
  }, [numLines]);

  // Persist memory to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ENGINE_STORAGE_KEYS.memory, memory.toString());
    }
  }, [memory]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === ENGINE_STORAGE_KEYS.numLines && e.newValue) {
        setNumLines(parseInt(e.newValue, 10));
      }
      if (e.key === ENGINE_STORAGE_KEYS.memory && e.newValue) {
        setMemory(parseInt(e.newValue, 10));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    memory,
    numLines,
    setMemory,
    setNumLines,
  };
};

export default useEngineSettings;
