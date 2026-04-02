import { useDrillStats } from '@hooks/chess';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const DrillContext = createContext();
const DEFAULT_INITIAL_VALUES = {};

export const DrillProvider = ({ children, initialValues = DEFAULT_INITIAL_VALUES, resetKey }) => {
  const [values, setValues] = useState(initialValues);
  const { stats, addUserMove } = useDrillStats();
  const isFirstResetRef = useRef(true);

  useEffect(() => {
    if (isFirstResetRef.current) {
      isFirstResetRef.current = false;
      return;
    }

    setValues(initialValues);
  }, [initialValues, resetKey]);

  // Function to update context values
  const updateContext = useCallback((newValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  // Initial context values
  const value = {
    values: {
      ...values,
      ...stats,
    },
    updateContext,
    addUserMove,
  };

  return <DrillContext.Provider value={value}>{children}</DrillContext.Provider>;
};

export const useDrillContext = () => {
  const context = useContext(DrillContext);
  if (!context) {
    throw new Error('Cannot use useDrillContext outside of DrillProvider');
  }
  return context;
};
