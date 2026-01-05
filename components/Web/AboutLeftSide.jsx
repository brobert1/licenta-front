import { Button } from '@components';
import { FeatureCards } from '@components/Web';

const AboutLeftSide = () => {
  return (
    <div className="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
      <div className="flex w-full flex-col items-start justify-center gap-8">
        <div className="flex flex-col items-center justify-start gap-4 lg:items-start">
          <div className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
            <h1 className="font-bold text-center text-3xl lg:text-5xl lg:text-start">
              Master Chess.
            </h1>
            <h1 className="font-bold text-center text-3xl lg:text-5xl lg:text-start">
              Elevate Your Game.
            </h1>
            <p className="pt-4 text-center lg:text-xl font-normal text-gray-500 lg:text-start">
              This is your destination for structured courses, practical strategies, and a deeper
              understanding of the game. No matter your level, you'll find the tools to elevate your
              chess and outplay the competition.
            </p>
          </div>
        </div>
        <FeatureCards />
      </div>
      <Button href="/courses" className="button full accent rounded-full font-semibold lg:text-lg">
        All courses
      </Button>
    </div>
  );
};

export default AboutLeftSide;
