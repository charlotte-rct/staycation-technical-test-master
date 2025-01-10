import { getHotels } from "./hotelService";
import * as hotelModel from "../db/models/hotelModel";

jest.mock("../db/models/hotelModel", () => ({
  getHotelsWithLowPrice: jest.fn(),
}));

const MOCKED_HOTELS = [
  {
    id: 1,
    name: "Hotel 1",
    price: 100,
    discountPrice: 80,
    isAvailable: true,
    pictureId: "1",
    preview: "Preview 1",
    reviewsAvgScore: 4.5,
    reviewsCount: 100,
    stars: 4,
  },
  {
    id: 2,
    name: "Hotel 2",
    price: 200,
    discountPrice: 150,
    isAvailable: true,
    pictureId: "2",
    preview: "Preview 2",
    reviewsAvgScore: 4.0,
    reviewsCount: 50,
    stars: 3,
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test("it should return a list of hotels", async () => {
  (hotelModel.getHotelsWithLowPrice as jest.Mock).mockResolvedValue(
    MOCKED_HOTELS
  );
  await expect(getHotels()).resolves.toEqual(MOCKED_HOTELS);
});
