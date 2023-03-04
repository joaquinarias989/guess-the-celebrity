import { useEffect, useRef, useState } from 'react';
import IconChevronRight from './icons/IconChevronRight';
import Idea from './Clue';
import SkeletonCelebrityImage from './skeletons/SkeletonCelebrityImage';
import SkeletonOption from './skeletons/SkeletonOption';

type Celebrity = {
  name: string;
  image: string;
};

type Option = {
  name: string;
  isCorrect: boolean;
};

const stringToSnakeCase = (str: string) => {
  const strClean = str.replace('-', '');

  return strClean
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
};

const getRandomCelebrity = async () => {
  const response = await fetch('/data/celebrities.json');
  const data = await response.json();
  const randomCelebrity =
    data.celebrities[Math.floor(Math.random() * data.celebrities.length)];
  return {
    name: randomCelebrity,
    image: data.image.url + stringToSnakeCase(randomCelebrity) + '.webp',
  };
};

const getRandomOptionsInclude = async (name: string) => {
  const response = await fetch('/data/celebrities.json');
  const data = await response.json();
  const randomOptions = data.celebrities
    .filter((celebr: string) => celebr !== name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [
    { name, isCorrect: true },
    ...randomOptions.map((celebr: string) => ({
      name: celebr,
      isCorrect: false,
    })),
  ].sort(() => Math.random() - 0.5);
};

const optionCorrectClasses =
  'text-green-500 border-b-green-500 hover:text-green-500 animate-pulse-zoom hover:scale-100';

const optionErrorClasses =
  'text-red-500 border-b-red-500 hover:text-red-500 animate-shake hover:scale-100';

export default function GameSection() {
  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [options, setOptions] = useState<Array<Option>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pickedOption, setPickedOption] = useState<Option | null>(null);
  const [quantityPlayed, setQuantityPlayed] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    getRandomCelebrity().then((celebrity) => {
      getRandomOptionsInclude(celebrity.name).then((options) => {
        setOptions(options);
        setCelebrity(celebrity);
        setLoading(false);
      });
    });

    // return () => {};
  }, [quantityPlayed]);

  const handleNext = () => {
    setPickedOption(null);
    setQuantityPlayed(quantityPlayed + 1);
  };

  return (
    <>
      <p className='text-xl text-gray-100'>¿Quién es la persona de debajo?</p>
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
                    : 'border-b-[#55E6C1] hover:text-[#55E6C1] hover:scale-105 '
                }`}
              >
                <button
                  type='button'
                  disabled={pickedOption != null}
                  className={`py-2 px-3`}
                  onClick={() => setPickedOption(option)}
                >
                  {option.name}
                </button>
              </li>
            ))
          )}
        </ol>
        <div className='grid place-items-center'>
          <picture className='w-80 h-80'>
            {loading ? (
              <SkeletonCelebrityImage />
            ) : (
              <img
                src={celebrity?.image}
                alt='Celebrity'
                className='w-full h-full object-cover border-2 border-dashed border-[#55E6C1] shadow-2xl rounded cursor-crosshair aspect-square'
              />
            )}
          </picture>
        </div>
        <div className='flex items-center justify-center max-w-2xl m-auto text-lg'>
          {pickedOption == null ? (
            <Idea celebrity={celebrity?.name} />
          ) : (
            <button
              className='flex items-center text-[#55E6C1] py-2'
              onClick={handleNext}
            >
              Siguiente <IconChevronRight />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
