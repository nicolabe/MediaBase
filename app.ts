import {
  Application,
  Router,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import {
  applyGraphQL,
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";
import { resolvers } from "./resolvers/index.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const types = (gql as any)`
type Book {
  _id: String
  title: String
  author: String
}

input BookInput {
  title: String
  author: String
}

type Query {
  getBook(id: String): Book,
  getBooks: [Book]
}

type Mutation {
  createBook(input: BookInput!): Book
}
`;

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: any) => {
    return { user: "Aaron" };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8081 });
