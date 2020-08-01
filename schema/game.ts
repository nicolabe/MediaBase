import { gql } from "../config/dependencies.ts";

export const GameTypes = (gql as any)`
  type Game {
    _id : ID
    title: String!
    creator: String!
  }
  input GameInput {
    title: String!
    creator: String!
  }
  extend type Query {
    getGame(_id: ID): Game
    getGames: [Game]
  }
  extend type Mutation {
    createGame(input: GameInput!): CreateResolveType
    deleteGame(_id: ID): Boolean
  }
`;
