import { getUserById } from "../db/models/userModel";

export const getUser = async (userId: number) => {
  return getUserById(userId);
};
