import { getQuizShapes } from '@chess/functions';
import { Button } from '@components';
import { useQuizState } from '@hooks';
import { classnames } from '@lib';
import GuestQuizBoard from './GuestQuizBoard';
import GuestQuizDoneScreen from './GuestQuizDoneScreen';
import GuestQuizExplanation from './GuestQuizExplanation';
import GuestQuizHeader from './GuestQuizHeader';
import GuestQuizIntro from './GuestQuizIntro';
import GuestQuizOption from './GuestQuizOption';

const GuestQuizSuccess = ({ tutorialQuestion, questions, course }) => {
  const {
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
  } = useQuizState(tutorialQuestion, questions);

  const boardShapes = getQuizShapes(submitted, isTutorial, selected, currentQuestion.options);

  if (phase === 'intro') {
    return <GuestQuizIntro onComplete={() => setPhase('tutorial')} />;
  }

  if (phase === 'done') {
    return <GuestQuizDoneScreen score={score} total={questions.length} course={course} />;
  }

  return (
    <div className="px-4 py-4 animate-quiz-enter">
      <div className="mx-auto max-w-sm">
        <GuestQuizHeader
          isTutorial={isTutorial}
          questionIndex={questionIndex}
          total={questions.length}
          score={score}
        />
        <p className="mb-2 text-center text-sm font-medium text-muted">
          Find the best move for White
        </p>
        <GuestQuizBoard fen={currentQuestion.fen} autoShapes={boardShapes} />
        <p
          className={classnames(
            'mt-1 mb-3 text-center text-sm transition-opacity',
            submitted ? 'opacity-0' : 'text-accent'
          )}
        >
          Tap any move to preview it
        </p>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((opt) => (
            <GuestQuizOption
              key={opt.label}
              option={opt}
              selected={selected?.label === opt.label}
              submitted={submitted}
              onTap={handleOptionTap}
            />
          ))}
        </div>
        {submitted && (
          <GuestQuizExplanation selected={selected} options={currentQuestion.options} />
        )}
        <div className="mt-3 pb-6">
          {!submitted ? (
            <Button
              onClick={handleConfirm}
              disabled={!selected}
              className={classnames(
                'w-full rounded-xl py-4 text-center font-semibold transition-all',
                selected
                  ? 'bg-accent text-white hover:opacity-90'
                  : 'cursor-not-allowed bg-tertiary text-grey'
              )}
            >
              {selected ? 'Confirm answer' : 'Select an answer'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full rounded-xl bg-accent py-4 text-center font-bold text-white transition-opacity hover:opacity-90"
            >
              {isTutorial
                ? 'Start Quiz →'
                : questionIndex + 1 < questions.length
                  ? 'Next Question →'
                  : 'See Results'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestQuizSuccess;
