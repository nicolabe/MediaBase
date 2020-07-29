import { addBook, getBook, getBooks } from "../mongo.ts";
import { validateBook } from "../validations/book.ts";

export default {
  getAllBooks: async ({ response }: any) => {
    response.body = await getBooks();
  },
  getBook: async ({ params, response }: any) => {
    if (!(params && params.id)) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Id must be passed when getting book",
      };
      return;
    }
    response.body = await getBook(params.id);
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
