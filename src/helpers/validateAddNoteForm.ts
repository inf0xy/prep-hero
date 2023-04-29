export const validateAddingNote = (
  content: string,
  listName?: string,
  title?: string
) => {
  let validFields =
    listName && title
      ? [listName.trim(), title.trim()].every((el) => el.length > 2)
      : true;

  return validFields && content.trim().length > 5;
};
