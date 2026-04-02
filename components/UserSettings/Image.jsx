import ImageLoading from './ImageLoading';

const Image = ({ src, alt, status }) => {
  if (!src) {
    return (
      <div className="relative aspect-square w-32 overflow-hidden rounded-md border-2 border-dashed border-primary sm:w-64">
        <div className="flex h-full w-full items-center justify-center bg-tertiary text-4xl text-secondary">
          <i className="fas fa-image text-white text-4xl"></i>
          {status === 'loading' && <ImageLoading />}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-32 overflow-hidden rounded-md border-2 border-dashed border-primary sm:w-64">
      <img alt={alt} className="h-full w-full object-cover object-center" src={src} />
      {status === 'loading' && <ImageLoading />}
    </div>
  );
};

export default Image;
