import * as userModel from "../db/models/userModel";
import { getUser } from "./userService";

jest.mock("../db/models/userModel", () => ({
  getUserById: jest.fn(),
}));

const MOCKED_USER = {
  id: 1,
  firstName: "Didier",
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("it should return a list of hotels", async () => {
  (userModel.getUserById as jest.Mock).mockResolvedValue(MOCKED_USER);
  await expect(getUser(1)).resolves.toEqual(MOCKED_USER);
});
