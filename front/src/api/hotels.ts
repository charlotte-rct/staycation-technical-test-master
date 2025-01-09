import { Hotel } from "../types/hotels";

const getHotels = async (): Promise<Hotel[]> => {
  const res = await fetch(`http://localhost:9000/hotels`);
  return res.json();
};

export { getHotels };
