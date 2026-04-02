import { createContext, useContext, useState } from 'react';

const StudyLayoutContext = createContext();

export const StudyLayoutProvider = ({ children }) => {
  const [contextValues, setContextValues] = useState({
    isAnalysisOpen: false,
    threatShape: null,
    setThreatFen: () => {},
  });

  // Function to update context values
  const updateContext = (newValues) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  // Initial context values
  const value = {
    ...contextValues,
    updateContext,
  };

  return <StudyLayoutContext.Provider value={value}>{children}</StudyLayoutContext.Provider>;
};

export const useStudyLayout = () => {
  const context = useContext(StudyLayoutContext);
  if (!context) {
    throw new Error('useStudyLayout must be used within a StudyLayoutProvider');
  }
  return context;
};
