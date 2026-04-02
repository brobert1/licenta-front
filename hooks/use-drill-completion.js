import { createDrillProgress, markChapterCompleted } from '@api/user-progress';
import { useDrillContext } from '@contexts/DrillContext';
import { coffee } from '@functions';
import { toaster } from '@lib';
import { useEffect, useState } from 'react';
import { useMutation, usePreview, useRerender } from '.';

const useDrillCompletion = ({ chapterId, pgnProps, refetch }) => {
  const { isPreview } = usePreview();
  const [key, rerender] = useRerender();
  const [mode, setMode] = useState('text');
  const [isCompleted, setIsCompleted] = useState(false);

  const { values } = useDrillContext();
  const { wrongMoves } = values;

  const { goToMoment, firstMoment, mainlineMoments } = pgnProps;

  // Mutation for marking chapter as completed
  const completionMutation = useMutation(markChapterCompleted, {
    successCallback: () => {
      refetch();
    },
  });

  // Mutation for saving drill progress
  const drillMutation = useMutation(createDrillProgress, { onSuccess: refetch });

  // Reset chessboard when mode changes
  useEffect(() => {
    rerender();
  }, [mode]);

  const handleComplete = async () => {
    if (mode === 'arrows') {
      toaster.success('Drill completed in arrow mode');
      await coffee(1500);
      goToMoment(firstMoment);
      setMode('squares');
    } else if (mode === 'squares') {
      toaster.success('Drill completed in squares mode');
      await coffee(1500);
      goToMoment(firstMoment);
      setMode('nohint');
    } else if (mode === 'nohint') {
      setIsCompleted(true);
      if (!isPreview && drillMutation?.mutate) {
        await drillMutation.mutate({ id: chapterId, data: { ...values } });
      }
      setMode('text');
    }
  };

  const handleRetry = () => {
    setIsCompleted(false);
    setMode('retry');
  };

  // Go to next wrong move if in retry mode
  const goNextMistake = async (wrongMoves) => {
    await coffee(400);
    if (wrongMoves.length > 0) {
      rerender();
      const firstWrongMoment = mainlineMoments.find((moment) => moment.fen === wrongMoves[0].fen);
      goToMoment(firstWrongMoment);
    } else {
      // Complete drill when all mistakes are fixed
      setIsCompleted(true);
      if (!isPreview && drillMutation?.mutate) {
        await drillMutation.mutate({ id: chapterId, data: { ...values } });
      }
      if (!isPreview) {
        await completionMutation.mutateAsync(chapterId);
      }
      setMode('text');
    }
  };

  // Keep going to next wrong move if in retry mode
  useEffect(() => {
    if (mode === 'retry') {
      goNextMistake(wrongMoves);
    }
  }, [mode, wrongMoves]);

  const resetDrill = () => {
    setMode('text');
    setIsCompleted(false);
  };

  return {
    key,
    mode,
    setMode,
    isCompleted,
    handleComplete,
    handleRetry,
    resetDrill,
  };
};

export default useDrillCompletion;
