import { IBook } from "../interfaces/book.ts";

export const validateBook = (
  { title, author }: IBook,
): Boolean => {
  if (!title) {
    return false;
  }
  if (!author) {
    return false;
  }
  return true;
};
