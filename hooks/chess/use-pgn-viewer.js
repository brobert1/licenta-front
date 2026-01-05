import { coffee } from '@functions';
import { getMainlineMoments, getSideToMove } from '@functions/chess';
import {
  addMomentToTree,
  tree as chessTree,
  getNextMoments,
  getPrevMoment,
  momentsToPgn,
} from 'chess-moments';
import { flatten, isEmpty, last } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const usePgnViewer = (pgn, options) => {
  const {
    autoSelectMainline = false,
    initialMoveIndex = 0,
    useArrowsToMove = true,
    onPositionChange,
  } = options || {};

  // === PGN state and navigation
  const [treeState, setTree] = useState(chessTree(pgn));
  const moments = useMemo(() => {
    return flatten(treeState);
  }, [treeState]);

  // Memoized PGN state
  const pgnState = useMemo(() => {
    return momentsToPgn(moments);
  }, [moments]);

  const firstMoment = useMemo(() => moments[0], [moments]);
  const lastMoment = useMemo(() => moments[moments.length - 1], [moments]);

  // Determine which side has the first turn
  const firstTurn = useMemo(() => getSideToMove(firstMoment?.fen), [firstMoment]);

  // Fallback to default moment if first moment is not available
  const defaultMoment = { fen: '', shapes: [] };

  const [currentMoment, setCurrentMoment] = useState(firstMoment || defaultMoment);
  const [variations, setVariations] = useState(null);
  const [userMoves, setUserMoves] = useState(null);

  // Prevent rerendering issues by using the current moment's FEN in React state
  const [fen, setFen] = useState(currentMoment?.fen);

  // Update tree when PGN changes
  useEffect(() => {
    const newTree = chessTree(pgn);
    setTree(newTree);
  }, [pgn]);

  useEffect(() => {
    if (initialMoveIndex === 0 || moments.length <= initialMoveIndex) {
      if (!currentMoment) {
        setCurrentMoment(firstMoment || defaultMoment);
      }
    } else {
      const mainLineMoves = moments.filter((move) => move.depth === 1 && move.move);
      const targetMove = mainLineMoves[initialMoveIndex] || firstMoment || defaultMoment;
      setCurrentMoment(targetMove);
    }
    setVariations(null);
    setUserMoves(null);
  }, [pgn, initialMoveIndex, moments]);

  // Call onPositionChange whenever currentMoment changes
  useEffect(() => {
    if (typeof onPositionChange === 'function') {
      onPositionChange(currentMoment?.fen);
    }
  }, [currentMoment]);

  const goPrevMoment = () => {
    const prevMoment = getPrevMoment(moments, currentMoment);
    if (!isEmpty(prevMoment)) {
      setCurrentMoment(prevMoment);
      setFen(prevMoment?.fen);
      setVariations(null);
      setUserMoves(null);
    }
  };

  const goNextMoment = () => {
    const nextMoments = getNextMoments(moments, currentMoment);
    if (isEmpty(nextMoments)) {
      return;
    }
    if (nextMoments.length === 1 || autoSelectMainline) {
      setCurrentMoment(nextMoments[0]);
      setFen(nextMoments[0]?.fen);
      setVariations(null);
      setUserMoves(null);
    } else if (nextMoments.length > 1) {
      setVariations(nextMoments);
    }
  };

  const goToMoment = (moment) => {
    setCurrentMoment(moment);
    setFen(moment?.fen);
    setVariations(null);
    setUserMoves(null);
  };

  const getNextMainlineMoment = () => {
    const nextMoments = getNextMoments(moments, currentMoment);
    return nextMoments[0] ?? null;
  };

  const getMoveIndex = (moment) => {
    if (!moment || !moments.length) return 0;
    const mainLineMoves = moments.filter((move) => move.depth === 1 && move.move);
    const moveIndex = mainLineMoves.findIndex((move) => move.id === moment.id);
    return moveIndex >= 0 ? moveIndex : 0;
  };

  // == Variations
  const handleVariationChoice = async (moveIndex) => {
    setCurrentMoment(moments[moveIndex]);
    await coffee(10); // Simulate a delay for the variations to update
    setVariations(null);
    setUserMoves(null);
  };

  const handleVariationsCancel = () => {
    setVariations(null);
    setUserMoves(null);
  };

  const syncLastMove = (fen) => {
    const existingMoment = moments.find((m) => m.fen === fen);
    if (existingMoment) {
      setCurrentMoment(existingMoment);
      setFen(existingMoment.fen);
    }
  };

  const handleUserMove = (chess) => {
    const userMove = last(chess.history({ verbose: true }));
    const newTree = addMomentToTree(treeState, userMove);
    setTree(newTree);

    // Get the updated moments from the new tree and find the newly added moment
    const newMoments = flatten(newTree);
    const currentFens = new Set(moments.map((moment) => moment.fen));
    const newMoment = newMoments.find((moment) => !currentFens.has(moment.fen));

    if (newMoment) {
      setCurrentMoment(newMoment);
      setFen(newMoment.fen);
    } else {
      const existingMoment = newMoments.find((moment) => moment.fen === userMove.after);
      setCurrentMoment(existingMoment);
      setFen(userMove.after);
    }
  };

  const handleUserMovesReset = () => {
    setUserMoves(null);
    goNextMoment();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!variations && useArrowsToMove) {
        if (event.key === 'ArrowLeft') {
          goPrevMoment();
        }
        if (event.key === 'ArrowRight') {
          goNextMoment();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goPrevMoment, goNextMoment, variations]);

  // Mainline moments
  const mainlineMoments = useMemo(() => {
    return getMainlineMoments(treeState);
  }, [treeState]);

  return {
    fen,
    pgn: pgnState,
    tree: treeState,
    moments,
    mainlineMoments,
    currentMoment,
    current: currentMoment,
    firstTurn,
    firstMoment,
    lastMoment,
    goPrevMoment,
    goNextMoment,
    goToMoment,
    getNextMainlineMoment,
    getMoveIndex,
    syncLastMove,

    variations,
    onVariationChoice: handleVariationChoice,
    onVariationsCancel: handleVariationsCancel,

    userMoves,
    onUserMove: handleUserMove,
    onUserMovesReset: handleUserMovesReset,
  };
};

export default usePgnViewer;
