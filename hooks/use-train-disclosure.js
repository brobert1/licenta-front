import { useState, useCallback } from 'react';

const useTrainDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fen, setFen] = useState(null); // Add fen state

  const toggle = useCallback((newFen = null) => { // Modify toggle to accept fen
    setIsOpen(prev => !prev);
    if (newFen !== null) {
      setFen(newFen);
    }
  }, []);

  const onOpen = useCallback((newFen = null) => {
    setIsOpen(true);
    if(newFen !== null){
      setFen(newFen);
    }
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setFen(null); // Reset fen when closing
  }, []);

  return { isOpen, onOpen, onClose, toggle, fen }; // Return fen
}

export default useTrainDisclosure;
