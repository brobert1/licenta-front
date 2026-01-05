import { useDrillStats } from '@hooks/chess';
import { createContext, useCallback, useContext, useState } from 'react';

const DrillContext = createContext();

export const DrillProvider = ({ children, initialValues = {} }) => {
  const [values, setValues] = useState(initialValues);
  const { stats, addUserMove } = useDrillStats();

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
