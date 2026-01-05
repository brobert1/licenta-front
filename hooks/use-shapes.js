import { useStudyLayout } from '@contexts/StudyLayoutContext';
import { compact } from 'lodash';
import { useEffect, useState } from 'react';
import useVariationArrows from './use-variation-arrows';

const useShapes = ({ userMoves, current, variations, externalThreatShape }) => {
  let threatShape;

  try {
    const context = useStudyLayout();
    threatShape = externalThreatShape !== undefined ? externalThreatShape : context.threatShape;
  } catch (error) {
    threatShape = externalThreatShape !== undefined ? externalThreatShape : null;
  }

  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  // Reset selected variation index when current changes
  useEffect(() => {
    setSelectedVariationIndex(0);
  }, [current]);

  const variationArrow = useVariationArrows(current, variations, selectedVariationIndex);

  const shapes = compact([
    ...(!userMoves && current.shapes ? current.shapes : []),
    threatShape,
    variationArrow,
  ]);

  return { shapes, refocusModal: setSelectedVariationIndex };
};

export default useShapes;
