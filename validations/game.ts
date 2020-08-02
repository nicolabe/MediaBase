import { IGame } from "../interfaces/game.ts";

export const validateGame = (
  { title, creator }: IGame,
): Boolean => {
  if (!title) {
    return false;
  }
  if (!creator) {
    return false;
  }
  return true;
};
