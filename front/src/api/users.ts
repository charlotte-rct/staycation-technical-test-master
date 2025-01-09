import fetch from "isomorphic-fetch";

const getUser = async (userId: string): Promise<User> => {
  const res = await fetch(`http://localhost:9000/users/${userId}`);
  return res.json();
};

export { getUser };
