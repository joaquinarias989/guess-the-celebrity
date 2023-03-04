const SkeletonClue = () => {
  return (
    <div className='space-y-3 w-full animate-pulse'>
      <div className='grid grid-cols-6 gap-4'>
        <div className='h-3 bg-slate-700 rounded col-span-1'></div>
        <div className='h-3 bg-slate-700 rounded col-span-5'></div>
      </div>
      <div className='h-3 bg-slate-700 rounded'></div>
      <div className='h-3 bg-slate-700 rounded'></div>
    </div>
  );
};

export default SkeletonClue;
