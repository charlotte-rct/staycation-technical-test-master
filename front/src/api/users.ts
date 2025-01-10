import fetch from "isomorphic-fetch";
import { User } from "../types/users";

const getUser = async (userId: number): Promise<User> => {
  const res = await fetch(`http://localhost:9000/users/${userId}`);
  return res.json();
};

export { getUser };
