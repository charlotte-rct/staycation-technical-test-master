import express from "express";
import cors from "cors";
import { getUser } from "./services/userService";
import { getHotels } from "./services/hotelService";

const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/users/:id", async (req, res) => {
  const user = await getUser(Number(req.params.id));
  res.send(user);
});

app.get("/hotels", async (req, res) => {
  const hotels = await getHotels();
  res.send(hotels);
});

app.listen(9000, function () {
  console.log("Example app listening on port 9000!");
});
