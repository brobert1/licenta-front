import { useState, useEffect } from 'react';
import { classnames } from '@lib';
import { Button } from '@components';

const GuestQuizIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [bubbleStep, setBubbleStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Sequence of capybara entrance + first bubble
    const timers = [
      setTimeout(() => setStep(1), 800), // Capybara appears
      setTimeout(() => setBubbleStep(1), 1500), // First message bubble
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleFinish = () => {
    setVisible(false);
    setTimeout(onComplete, 500); // Wait for exit animation
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500">
      <div className="relative flex w-full max-w-lg flex-col items-center justify-center px-6 min-h-[480px]">
        <div
          className={classnames(
            'transition-all duration-700 ease-out transform',
            step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
          )}
        >
          <div className="relative h-48 w-48 lg:h-64 lg:w-64">
            <img
              src="/images/capybara-tutorial.png"
              alt="Cappy the Capybara"
              className={classnames(
                'absolute inset-0 h-full w-full object-contain drop-shadow-xl transition-opacity duration-500',
                bubbleStep >= 2 ? 'opacity-0' : 'opacity-100'
              )}
            />
            <img
              src="/images/capybara-coach.png"
              alt="Cappy ready to coach"
              className={classnames(
                'absolute inset-0 h-full w-full object-contain drop-shadow-xl transition-opacity duration-500',
                bubbleStep >= 2 ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
        </div>
        <div className="mt-6 w-full max-w-md">
          <div
            className={classnames(
              'relative rounded-3xl bg-white p-8 shadow-2xl origin-top',
              bubbleStep === 0 ? 'opacity-0 pointer-events-none' : 'animate-bubble-drop'
            )}
          >
            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 transform bg-white"></div>
            <div className="relative z-10 flex min-h-56 flex-col text-center">
              <div className="flex-1">
                <h3
                  key={`title-${bubbleStep}`}
                  className="mb-6 text-xl font-bold text-gray-800 animate-chat-slide-in"
                >
                  {bubbleStep === 1
                    ? "Hi, I'm Cappy — your chess coach."
                    : 'First, let me learn a bit about you.'}
                </h3>
                <div className="relative flex h-20 items-center justify-center">
                  {bubbleStep === 1 && (
                    <p
                      key="msg-1"
                      className="absolute w-full text-center text-gray-600 animate-text-fade-up mt-2"
                    >
                      I'll be hanging around the platform with you—guiding puzzles, explaining
                      ideas, and helping you turn tricky positions into clear plans.
                    </p>
                  )}
                  {bubbleStep === 2 && (
                    <p
                      key="msg-2"
                      className="absolute w-full text-center text-gray-600 animate-chat-slide-in"
                    >
                      To coach you properly, I need to know your current level. Let's start with a
                      short quiz so I can see how you think in real positions.
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex h-14 items-center justify-center">
                {bubbleStep === 1 && (
                  <Button
                    onClick={() => setBubbleStep(2)}
                    className="rounded-xl bg-accent px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent/90 focus:ring-4 ring-accent/30 mt-6"
                  >
                    Nice to meet you, Cappy
                  </Button>
                )}
                {bubbleStep === 2 && (
                  <Button
                    onClick={handleFinish}
                    className="rounded-xl bg-accent px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent/90 focus:ring-4 ring-accent/30"
                  >
                    Start the quiz now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestQuizIntro;
