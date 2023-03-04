const SkeletonCelebrityImage = () => {
  return (
    <div className='w-full h-full object-cover border-2 border-dashed border-slate-700 shadow-2xl rounded cursor-crosshair aspect-square grid place-content-center animate-pulse'>
      <span className='sr-only'>Cargando imagen...</span>
    </div>
  );
};

export default SkeletonCelebrityImage;
