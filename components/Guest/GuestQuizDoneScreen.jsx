import { formatMoney } from 'accounting';
import { Button } from '@components';
import quizDoneMessages from '@data/quiz-done-messages';
import { coffee } from '@functions';
import { useStripe } from '@hooks';
import { useState } from 'react';
import GuestQuizCtaButton from './GuestQuizCtaButton';

const GuestQuizDoneScreen = ({ score, total, course }) => {
  const [copied, setCopied] = useState(false);
  const { handlePurchase, isLoading } = useStripe(course);

  const pct = Math.round((score / total) * 100);
  const { title, message } = quizDoneMessages.find((t) => pct >= t.min);
  const beatPct = Math.min(Math.round(pct * 0.9), 95);

  const shareUrl = `${process.env.APP_BASE_URL}/guest/quiz?score=${score}&total=${total}`;

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({
      title: `I scored ${score}/${total} — can you beat me?`,
      url: shareUrl,
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    await coffee(2000);
    setCopied(false);
  };

  return (
    <div className="px-4 py-6 animate-quiz-enter">
      <div className="mx-auto max-w-sm">
        <div className="mb-5 text-center">
          <img
            src="/images/capybara-success.png"
            alt="Cappy celebrates"
            className="mx-auto mb-3 h-36 w-36 object-contain drop-shadow-xl"
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">{title}</h2>
          <p className="mt-1 text-sm text-muted">
            You beat <span className="font-bold text-accent">{beatPct}%</span> of players
          </p>
        </div>
        <div className="mb-5 flex items-center justify-center gap-3">
          <div className="flex flex-col items-center rounded-2xl bg-accent/10 px-6 py-3">
            <span className="text-2xl font-extrabold text-accent">
              {score} / {total}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent/60">
              correct
            </span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-tertiary px-6 py-3">
            <span className="text-2xl font-extrabold text-primary">{pct}%</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              accuracy
            </span>
          </div>
        </div>
        <div className="mb-5 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-sm text-accent"></i>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Cappy says
            </span>
          </div>
          <p className="text-sm leading-relaxed text-primary">{message}</p>
        </div>
        <div className="mb-5 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4">
          <div className="mb-3 flex items-center gap-2">
            <i className="fa-solid fa-bullseye text-sm text-accent"></i>
            <span className="text-sm font-bold text-primary">Challenge your friends</span>
          </div>
          <Button
            onClick={handleShare}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-white py-2.5 text-sm font-semibold text-accent transition-opacity hover:opacity-75"
          >
            <i className="fa-solid fa-share-nodes"></i>
            Share Challenge
          </Button>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2">
            <span className="flex-1 truncate text-xs text-muted">
              {process.env.APP_BASE_URL}/guest/quiz
            </span>
            <Button
              onClick={handleCopy}
              className="text-accent transition-opacity hover:opacity-70"
              title={copied ? 'Copied!' : 'Copy link'}
            >
              <i
                className={
                  copied ? 'fa-solid fa-check text-sm text-green-500' : 'fa-regular fa-copy text-sm'
                }
              ></i>
            </Button>
          </div>
        </div>
        <GuestQuizCtaButton onClick={handlePurchase} disabled={isLoading || !course}>
          {isLoading
            ? 'Redirecting...'
            : `Get the Full Course — ${formatMoney(course?.price, { symbol: '€', precision: 0, format: '%v %s' })}`}
          {!isLoading && <i className="fa-solid fa-chevron-right text-xs"></i>}
        </GuestQuizCtaButton>
        <p className="mt-3 text-center text-xs text-muted">
          <i className="fa-solid fa-check mr-1 text-green-500"></i>
          30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default GuestQuizDoneScreen;
