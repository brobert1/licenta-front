const FeatureCards = () => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6">
      <div className="grid w-full grid-cols-1 items-center justify-start gap-6 md:grid-cols-2">
        <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
          <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">10+ Years</h4>
          <p className="text-base leading-relaxed font-normal text-gray-500">
            Helping students improve their chess since the age of 15!
          </p>
        </div>
        <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
          <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
            +1800 Students
          </h4>
          <p className="text-base leading-relaxed font-normal text-gray-500">
            Learn, grow, and improve alongside a chess community.
          </p>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 items-center justify-start gap-6 md:grid-cols-2">
        <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
          <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">0 to 2500</h4>
          <p className="text-base leading-relaxed font-normal text-gray-500">
            All his material has been extensively pilot-tested.
          </p>
        </div>
        <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
          <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
            99% Happy Clients
          </h4>
          <p className="text-base leading-relaxed font-normal text-gray-500">
            2023 Author of the Year and Best Presenter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
