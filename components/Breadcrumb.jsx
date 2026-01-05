const Breadcrumb = ({ title, page, children }) => {
  return (
    <div className="w-full grid gap-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-grey gap-1.5">
            <p className="hover:text-white cursor-pointer">MyChessPlace</p>
            <i className="fa-solid fa-greater-than text-xs mt-0.5"></i>
            <p className="hover:text-white cursor-pointer">{page}</p>
          </div>
          <h1 className="text-xl lg:text-3xl font-bold text-white">{title}</h1>
        </div>
        {children ? <div className="flex-shrink-0">{children}</div> : null}
      </div>
    </div>
  );
};

export default Breadcrumb;
