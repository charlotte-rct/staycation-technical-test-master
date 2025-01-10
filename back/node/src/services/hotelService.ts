import { getHotelsWithLowPrice } from "../db/models/hotelModel";

export const getHotels = async () => {
  return getHotelsWithLowPrice();
};
