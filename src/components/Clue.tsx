import { useState } from 'react';
import IconLightBlub from './icons/IconLightBlub';
import SkeletonClue from './skeletons/SkeletonClue';

const getClueFromWikipedia = async (celebrity: string) => {
  const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${celebrity}`;
  const response = await fetch(url);
  const data = await response.json();
  const query = data.query.search[0].snippet;
  //remove html tags
  const noHtml = query.replace(/<[^>]*>?/gm, '');
  //remove corchetes
  const noCorchetes = noHtml.replace(/\[.*?\]/g, '');
  //replace the first lines up to the first parenthesis
  const noFirstLines = noCorchetes.replace(/^.+?\(/, '(');
  //add suspensive points at the end
  const cleanClue = noFirstLines + '...';

  return cleanClue;
};

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
        className='text-[#55E6C1] font-bold flex items-center gap-1 group'
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
