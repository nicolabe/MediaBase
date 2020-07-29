export enum MediaType {
  Book = "BOOK",
  Game = "GAME",
  Show = "SHOW",
  Movie = "MOVIE",
}

export interface MediaSchema {
  _id: { $oid: string };
  title: string;
  category: MediaType;
  author?: string;
}
