import React from "react";
import { Hotel } from "../../types/hotels";

import "./hotelCard.scss";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div
      className={`hotel-card ${
        !hotel.isAvailable ? "hotel-card--unavailable" : ""
      }`}
    >
      <img
        src={hotel.pictureId}
        alt={hotel.name}
        className="hotel-card__picture"
      />
      <div className="hotel-card__title">
        <span className="hotel-card__title__name">
          {hotel.name} {"*".repeat(hotel.stars)}
        </span>
        {hotel.reviewsAvgScore && hotel.reviewsCount && (
          <span className="hotel-card__title__reviews">
            {hotel.reviewsAvgScore?.toFixed(1)} ({hotel.reviewsCount})
          </span>
        )}
      </div>
      <div className="hotel-card__preview">{hotel.preview}</div>
      <div className="hotel-card__prices">
        <span className="hotel-card__prices__discount-price">
          {hotel.discountPrice}€
        </span>
        <s className="hotel-card__prices__price">{hotel.price}€</s>
        <span className="hotel-card__prices__percentage">
          -
          {Math.round(
            ((hotel.price - hotel.discountPrice) / hotel.price) * 100
          )}
          %
        </span>
      </div>
    </div>
  );
};
export default HotelCard;
