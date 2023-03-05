import { useEffect, useState } from 'react';
import IconChevronRight from './icons/IconChevronRight';
import SkeletonCelebrityImage from './skeletons/SkeletonCelebrityImage';
import SkeletonOption from './skeletons/SkeletonOption';
import Clue from './Clue';
import {
  getRandomCelebrity,
  getRandomOptionsInclude,
} from '../services/game.service';

const optionCorrectClasses =
  'text-green-500 border-b-green-500 hover:text-green-500 animate-pulse-zoom hover:scale-100';

const optionErrorClasses =
  'text-red-500 border-b-red-500 hover:text-red-500 animate-shake hover:scale-100';

export default function GameSection() {
  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [options, setOptions] = useState<Array<Option>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pickedOption, setPickedOption] = useState<Option | null>(null);
  const [score, setScore] = useState<Score>({ hits: 0, misses: 0 });
  const [countPlayed, setCountPlayed] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    getRandomCelebrity().then((celebrity) => {
      getRandomOptionsInclude(celebrity.name).then((options) => {
        setOptions(options);
        setCelebrity(celebrity);
        setLoading(false);
      });
    });
  }, [countPlayed]);

  const handlePickOption = (option: Option) => {
    setPickedOption(option);
    setScore((prevScore) => {
      if (option.isCorrect) {
        return {
          hits: prevScore.hits + 1,
          misses: prevScore.misses,
        };
      } else {
        return {
          hits: prevScore.hits,
          misses: prevScore.misses + 1,
        };
      }
    });
  };

  const handleNext = () => {
    setPickedOption(null);
    setCountPlayed((prevCountPlayed) => prevCountPlayed + 1);
  };

  return (
    <>
      <div className='space-y-10'>
        <ol className='flex justify-center items-center flex-wrap gap-6 list-[upper-latin] list-inside text-white'>
          {loading ? (
            <SkeletonOption quantity={4} />
          ) : (
            options.map((option) => (
              <li
                key={option.name}
                className={`text-xl border-b-2 transition-all ${
                  pickedOption != null
                    ? (option.isCorrect && optionCorrectClasses) ||
                      (option.name === pickedOption.name && optionErrorClasses)
                    : 'border-b-[#55E6C1] hover:text-[#55E6C1] hover:scale-105'
                }`}
              >
                <button
                  type='button'
                  disabled={pickedOption != null}
                  className={`py-2 px-3 ${
                    pickedOption != null
                      ? option.name === pickedOption.name && !option.isCorrect
                        ? 'line-through'
                        : ''
                      : ''
                  }`}
                  onClick={() => handlePickOption(option)}
                >
                  {option.name}
                </button>
              </li>
            ))
          )}
        </ol>
        <div className='grid place-items-center'>
          <picture className='w-full h-full max-w-[20rem] max-h-[20rem] sm:w-80 sm:h-80 relative aspect-square'>
            {loading ? (
              <SkeletonCelebrityImage />
            ) : (
              <>
                {pickedOption != null &&
                  (pickedOption.isCorrect ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2.5}
                      className='absolute inset-0 m-auto w-0 stroke-green-500 animate-answer'
                    >
                      <path
                        strokeLinecap='square'
                        strokeLinejoin='bevel'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2.5}
                      className='absolute inset-0 m-auto w-0 stroke-red-500 animate-answer'
                    >
                      <path
                        strokeLinecap='square'
                        strokeLinejoin='bevel'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  ))}
                <img
                  src={
                    pickedOption != null
                      ? celebrity?.image
                      : celebrity?.imageBlur
                  }
                  alt={`${
                    pickedOption != null
                      ? `Celebridad ${celebrity?.name}`
                      : `Celebridad ${celebrity?.name} pixelada`
                  }`}
                  className='w-full h-full object-cover border-2 border-dashed border-[#55E6C1] shadow-2xl rounded cursor-crosshair aspect-square'
                />
              </>
            )}
          </picture>
        </div>
        <div className='flex items-center justify-center max-w-2xl m-auto text-lg'>
          {loading ? (
            <span className='bg-slate-700 w-60 h-4 rounded-lg'></span>
          ) : pickedOption == null ? (
            <Clue celebrity={celebrity?.name} />
          ) : (
            <div className='space-y-2 md:space-y-0'>
              <button
                className='flex items-center justify-center text-[#55E6C1] gap-1 md:py-2 group w-full'
                onClick={handleNext}
              >
                Siguiente{' '}
                <IconChevronRight
                  className={
                    'group-hover:translate-x-2 group-hover:scale-110 transition-all'
                  }
                />
              </button>
              <p className='text-gray-100'>
                Acertaste{' '}
                <span className='text-green-500 font-bold'>{score.hits}</span> y
                fallaste{' '}
                <span className='text-red-500 font-bold'>{score.misses}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
