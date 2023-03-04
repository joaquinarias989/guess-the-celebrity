export const stringToSnakeCase = (str: string) => {
  const strClean = str.replace('-', '');

  return strClean
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
};

export const removeHtmlTags = (str: string) => {
  return str.replace(/<[^>]*>?/gm, '');
};
