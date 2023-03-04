import { useState } from 'react';
import { getClueFromWikipedia } from '../services/game.service';
import IconLightBlub from './icons/IconLightBlub';
import SkeletonClue from './skeletons/SkeletonClue';

export default function Clue({ celebrity }: { celebrity: string | undefined }) {
  const [clue, setClue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClue = () => {
    setLoading(true);
    getClueFromWikipedia(celebrity!)
      .then((clue) => setClue(clue))
      .finally(() => setLoading(false));
  };

  if (loading) return <SkeletonClue />;

  return clue ? (
    <p className='text-gray-100'>
      <span className='text-[#55E6C1] font-bold'>Pista:</span> {clue}
    </p>
  ) : (
    <div className='flex items-center justify-center gap-2 flex-wrap'>
      <span className='text-gray-100'>¿Ninguna idea?</span>
      <button
        className='text-[#55E6C1] font-bold flex items-center gap-1 md:py-2 group'
        onClick={handleClue}
      >
        Dame una pista{' '}
        <IconLightBlub
          className={'animate-pulse group-hover:animate-bounce transition-all'}
        />
      </button>
    </div>
  );
}
