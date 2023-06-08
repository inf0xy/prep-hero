import { Note } from "@/types/dataTypes";

export const validateAddingNote = (note: Note) => {
  let message = '';

  if (note.list_name!.trim().length < 2) {
    message = 'List name have at least 2 characters.';
  } else if (note.title!.trim().length < 2) {
    message = 'Title must have at least 2 characters.';
  }

  return { valid: message.length === 0 ? true : false, message };
};
