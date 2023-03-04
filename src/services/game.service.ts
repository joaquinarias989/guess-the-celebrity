import { removeHtmlTags, stringToSnakeCase } from '../utils';

const CLOUDINARY_FETCH_URL =
  'https://res.cloudinary.com/joaquinarias/image/fetch';

const WIKIPEDIA_API_SEARCH_URL =
  'https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=';

const fetchData = async () => {
  const response = await fetch('/data/celebrities.json');
  const data = await response.json();
  return data;
};

export const getRandomCelebrity = async () => {
  const data = await fetchData();
  const randomCelebrity =
    data.celebrities[Math.floor(Math.random() * data.celebrities.length)];
  const image = data.image.url + stringToSnakeCase(randomCelebrity) + '.webp';

  return {
    name: randomCelebrity,
    image,
    imageBlur: `${CLOUDINARY_FETCH_URL}/e_pixelate_faces:10/${image}`,
  };
};

export const getRandomOptionsInclude = async (name: string) => {
  const data = await fetchData();
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

export const getClueFromWikipedia = async (celebrity: string) => {
  const url = `${WIKIPEDIA_API_SEARCH_URL}${celebrity}`;
  const response = await fetch(url);
  const data = await response.json();
  const query = data.query.search[0].snippet;
  const noHtml = removeHtmlTags(query);
  //remove corchetes
  const noCorchetes = noHtml.replace(/\[.*?\]/g, '');
  //replace the first lines up to the first parenthesis
  const noFirstLines = noCorchetes.replace(/^.+?\(/, '(');
  //add suspensive points at the end
  const cleanClue = noFirstLines + '...';

  return cleanClue;
};
