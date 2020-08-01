import { gql } from "../config/dependencies.ts";
import { BookTypes } from "./book.ts";

export const Schema = (gql as any)`
    type Query{
      _empty: String
    }
    type Mutation {
      _empty: String
    }
    type CreateResolveType {
      _id: String
    }
    ${BookTypes}
`;
