import axios from 'axios';
import { useState } from 'react';

const useGameReview = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedPgn, setAnalyzedPgn] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [accuracyPercentage, setAccuracyPercentage] = useState(null);
  const [evaluations, setEvaluations] = useState(null);
  const [error, setError] = useState(null);

  const analyzeGame = async (pgn) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const analysisToken = process.env.CASTLE_API_TOKEN;

      const response = await axios.post(
        `${process.env.CASTLE_API_URL}/analyze`,
        { pgn },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${analysisToken}`,
          },
        }
      );

      if (response.data?.annotated_pgn) {
        setAnalyzedPgn(response.data.annotated_pgn);
        setAccuracy(response.data.accuracy);
        setAccuracyPercentage(response.data.accuracyPercentage);
        setEvaluations(response.data.evaluations);
        return response.data;
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to analyze game');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalyzedPgn(null);
    setAccuracy(null);
    setAccuracyPercentage(null);
    setEvaluations(null);
    setError(null);
  };

  return {
    isAnalyzing,
    analyzedPgn,
    accuracy,
    accuracyPercentage,
    evaluations,
    error,
    analyzeGame,
    resetAnalysis,
  };
};

export default useGameReview;
