import { addBook, getBooks } from "../mongo.ts";
import { validateBook } from "../validations/book.ts";

export default {
  getAllBooks: async (context: any) => {
    const books = await getBooks();
    context.response.body = books;
  },
  createBook: async ({ request, response }: any) => {
    const body = request.body();
    const data = await body.value;
    if (validateBook(data) === false) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Data validation failed",
      };
      return;
    }
    await addBook(data.title, data.author);
    response.status = 204;
  },
};
