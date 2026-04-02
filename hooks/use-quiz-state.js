import { useMemo, useState } from 'react';

const LS_KEY = 'guestQuizResult';
const lsGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const lsSet = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (e) {
    /* silent — private browsing may block writes */
  }
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const useQuizState = (tutorialQuestion, questions) => {
  const shuffledQuestions = useMemo(
    () => questions.map((q) => ({ ...q, options: shuffleArray(q.options) })),
    [questions]
  );

  const [phase, setPhase] = useState(() => (lsGet(LS_KEY) ? 'done' : 'intro'));
  const [score, setScore] = useState(() => {
    const stored = lsGet(LS_KEY);
    return stored ? JSON.parse(stored).score : 0;
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isTutorial = phase === 'tutorial';
  const currentQuestion = isTutorial ? tutorialQuestion : shuffledQuestions[questionIndex];

  const handleOptionTap = (option) => {
    if (submitted) return;
    setSelected(option);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setSubmitted(true);
    if (!isTutorial && selected.isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);

    if (isTutorial) {
      setPhase('question');
      return;
    }

    if (questionIndex + 1 < shuffledQuestions.length) {
      setQuestionIndex((i) => i + 1);
    } else {
      lsSet(
        LS_KEY,
        JSON.stringify({ score, total: questions.length, completedAt: new Date().toISOString() })
      );
      setPhase('done');
    }
  };

  return {
    phase,
    setPhase,
    isTutorial,
    currentQuestion,
    questionIndex,
    selected,
    submitted,
    score,
    handleOptionTap,
    handleConfirm,
    handleNext,
  };
};

export default useQuizState;
