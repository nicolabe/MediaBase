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
  }
  extend type Mutation {
    createBook(input: BookInput): Book
  }
`;
