import { getMedia, getAllMedia, addMedia, deleteMedia } from "../mongo.ts";
import { MediaType } from "../interfaces/media.ts";
import { validateGame } from "../validations/game.ts";

export const GameResolvers = {
  Query: {
    getGame: async (parent: any, { _id }: any, context: any, info: any) =>
      getMedia(_id),
    getGames: async () => {
      const games = await getAllMedia(MediaType.Game);
      return games.map((game: any) => ({
        ...game,
        _id: game._id.$oid,
      }));
    },
  },

  Mutation: {
    createGame: async (
      parent: any,
      { input: data }: any,
      context: any,
      info: any,
    ) => {
      if (!validateGame(data)) {
        return false;
      }
      const game = await addMedia({
        title: data.title,
        creator: data.creator,
      }, MediaType.Game);
      return {
        _id: game.$oid,
      };
    },
    deleteGame: async (parent: any, { _id }: any, context: any, info: any) => {
      try {
        const data = await deleteMedia(_id);
        return Boolean(data);
      } catch (err) {
        return false;
      }
    },
  },
};
