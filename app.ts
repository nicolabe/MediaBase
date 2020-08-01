import {
  Application,
  Router,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import {
  applyGraphQL,
} from "https://deno.land/x/oak_graphql/mod.ts";
import { resolvers } from "./resolvers/index.ts";
import { Schema } from "./schema/index.ts";

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

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: Schema,
  resolvers: resolvers,
  context: (ctx: any) => {
    return;
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8081 });
