const AboutRightSide = () => {
  return (
    <div className="relative hidden w-full items-start justify-center lg:block lg:justify-start">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 rounded-3xl border-gray-200 sm:h-[646px] sm:w-[564px] sm:border sm:bg-slate-100">
        <img
          alt=""
          className="max-h-72 w-auto object-contain px-8 sm:max-h-80"
          src="/images/hess-removebg-preview.png"
        />
        <p className="font-semibold text-2xl text-primary md:text-3xl">Rook&apos;N&apos;Learn</p>
      </div>
    </div>
  );
};

export default AboutRightSide;
