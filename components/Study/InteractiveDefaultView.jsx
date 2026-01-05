import { Comment } from '@chess/components/PgnViewer';

const InteractiveDefaultView = ({ current, moments }) => {
  const nextMoment = moments?.find((m) => m?.index === current?.index + 1);
  const extraComment = current?.comment || nextMoment?.comment;

  return (
    <div className="flex flex-col items-center justify-start mb-10 h-full pt-6">
      <div className="relative w-32 h-32 2xl:w-40 2xl:h-40 flex items-center justify-center mb-4">
        <img
          src="/images/success-capybara.png"
          alt="Chess Coach Capybara"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="bg-secondary text-white p-4 px-6 rounded-lg shadow-md relative mt-[-20px] w-80 text-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 top-tooltip"></div>
        <span>Find the best move to continue.</span>
      </div>
      {extraComment && (
        <div className="bg-secondary text-white p-4 px-6 rounded-lg shadow-md mt-6 mb-6 w-80">
          <Comment comment={extraComment} />
        </div>
      )}
    </div>
  );
};

export default InteractiveDefaultView;
