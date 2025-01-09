import React, { useEffect } from "react";

import Header from "./Header";
import { Hotel } from "../types/hotels";
import { getHotels } from "../api/hotels";
import HotelCard from "./HotelCard";

import "./app.scss";

const App = () => {
  const [hotels, setHotels] = React.useState<Hotel[]>([]);

  useEffect(() => {
    getHotels().then((data) => setHotels(data));
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <ul className="app__body__hotels">
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <HotelCard hotel={hotel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
