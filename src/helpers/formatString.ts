export const formatString = (text: string) => {
  return text.replace(/\b\w/g, (match) => match.toUpperCase());
};

export const formatLongString = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};