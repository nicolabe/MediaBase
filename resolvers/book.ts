import { getBook, getBooks, addBook } from "../mongo.ts";

export const BookResolvers = {
  Query: {
    getBook: async (parent: any, { id }: any, context: any, info: any) =>
      getBook(id),
    getBooks: async (parent: any, data: any, context: any, info: any) => {
      const books = await getBooks();
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
    ) => addBook(title, author),
  },
};
