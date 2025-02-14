import camelCase from "camelcase-keys";

import DB from "../db";

export const getUserById = async (userId: number) => {
  const res = await DB.query("SELECT * FROM users WHERE id=$1::int", [userId]);
  return camelCase(res.rows[0]);
};
