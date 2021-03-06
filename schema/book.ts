import { gql } from "../config/dependencies.ts";

export const BookTypes = (gql as any)`
  type Book {
    _id : ID
    title: String!
    author: String!
  }
  input BookInput {
    title: String!
    author: String!
  }
  extend type Query {
    getBook(_id: ID): Book
    getBooks: [Book]
  }
  extend type Mutation {
    createBook(input: BookInput!): CreateResolveType
    deleteBook(_id: ID): Boolean
  }
`;
