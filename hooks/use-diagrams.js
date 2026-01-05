import { useState, useEffect } from 'react';

const useDiagrams = (diagrams = [], initialDiagramFromParent = null) => {
  const getInitialDiagram = () => {
    if (initialDiagramFromParent) return initialDiagramFromParent;
    return diagrams.find((diagram) => !diagram.isCompleted) || diagrams[0];
  };

  const [activeDiagram, setActiveDiagram] = useState(getInitialDiagram());

  useEffect(() => {
    if (initialDiagramFromParent && diagrams.some((d) => d._id === initialDiagramFromParent._id)) {
      setActiveDiagram(initialDiagramFromParent);
    } else if (
      !initialDiagramFromParent &&
      (!activeDiagram || !diagrams.some((d) => d._id === activeDiagram._id))
    ) {
      setActiveDiagram(diagrams.find((diagram) => !diagram.isCompleted) || diagrams[0]);
    }
  }, [initialDiagramFromParent, diagrams]);

  const handleDiagramChange = (index) => {
    setActiveDiagram(diagrams.find((diagram) => diagram.index === index) ?? diagrams[0]);
  };

  return { activeDiagram, handleDiagramChange };
};

export default useDiagrams;
