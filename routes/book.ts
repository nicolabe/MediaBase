import { Router } from "https://deno.land/x/oak/mod.ts";
import bookController from "../controllers/book.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/books", bookController.getAllBooks)
  .get("/books/:id", bookController.getBook)
  .post("/books", bookController.createBook);
// .get("/books/:id", (context) => {
//   if (context.params && context.params.id && books.has(context.params.id)) {
//     context.response.body = books.get(context.params.id);
//   }
// });

export default router;
