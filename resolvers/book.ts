import { getMedia, getAllMedia, addMedia } from "../mongo.ts";
import { MediaType } from "../interfaces/media.ts";

export const BookResolvers = {
  Query: {
    getBook: async (parent: any, { _id }: any, context: any, info: any) =>
      getMedia(_id),
    getBooks: async (parent: any, data: any, context: any, info: any) => {
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
      { input: { title, author } }: any,
      context: any,
      info: any,
    ) => {
      const book = await addMedia({
        title,
        author,
      }, MediaType.Book);
      return {
        _id: book.$oid,
      };
    },
  },
};
