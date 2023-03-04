const SkeletonOption = ({ quantity }: { quantity: number }) => {
  return (
    <>
      {Array(quantity)
        .fill(null)
        .map((_, index) => (
          <li className='animate-pulse flex items-center gap-2' key={index}>
            <span className='inline-block bg-slate-700 h-11 w-11 rounded-full'></span>
            <span className='inline-block bg-slate-700 h-5 w-28 rounded-lg'></span>
          </li>
        ))}
    </>
  );
};

export default SkeletonOption;
