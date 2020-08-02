import { getMedia, getAllMedia, addMedia, deleteMedia } from "../mongo.ts";
import { MediaType } from "../interfaces/media.ts";
import { validateBook } from "../validations/book.ts";

export const BookResolvers = {
  Query: {
    getBook: async (parent: any, { _id }: any, context: any, info: any) =>
      getMedia(_id),
    getBooks: async () => {
      const books = await getAllMedia(MediaType.Book);
      return books.map((book: any) => ({
        ...book,
        _id: book._id.$oid,
      }));
    },
  },

  Mutation: {
    createBook: async (
      parent: any,
      { input: data }: any,
      context: any,
      info: any,
    ) => {
      if (!validateBook(data)) {
        return false;
      }
      const book = await addMedia({
        title: data.title,
        author: data.author,
      }, MediaType.Book);
      return {
        _id: book.$oid,
      };
    },
    deleteBook: async (parent: any, { _id }: any, context: any, info: any) => {
      try {
        const data = await deleteMedia(_id);
        return Boolean(data);
      } catch (err) {
        return false;
      }
    },
  },
};
