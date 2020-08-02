import { getMedia, getAllMedia, addMedia, deleteMedia } from "../mongo.ts";
import { MediaType } from "../interfaces/media.ts";

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
      { input: { title, creator } }: any,
      context: any,
      info: any,
    ) => {
      const game = await addMedia({
        title,
        creator,
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
