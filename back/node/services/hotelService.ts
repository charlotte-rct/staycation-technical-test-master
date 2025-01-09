import camelCase from "camelcase-keys";

import DB from "../db";

export const getHotels = async () => {
  const res = await DB.query(`
    WITH last_sale_id AS (
    SELECT MAX(id) AS sale_id
    FROM sale_dates
),
ranked_openings AS (
    SELECT 
        r.hotel_id,
		o.discount_price,
		o.price,
		o.stock - COUNT(b.id) AS remaining_stock,
        TRUE AS is_available,
    	ROW_NUMBER() OVER (PARTITION BY r.hotel_id ORDER BY o.discount_price ASC) AS row_num
    FROM openings o
    INNER JOIN rooms r ON r.id = o.room_id
    LEFT JOIN bookings b
        ON o.room_id = b.room_id AND o.date = b.date
    WHERE o.sale_id = (SELECT sale_id FROM last_sale_id)
    GROUP BY r.hotel_id, o.id
    HAVING o.stock - COUNT(b.id) > 0
), 
most_recent_sales_with_avaibility AS (
	SELECT 
		h.id AS hotel_id,
        MAX(sd.start_date) AS start_date
    FROM
        hotels h
    INNER JOIN rooms r ON r.hotel_id = h.id 
    INNER JOIN openings o ON o.room_id = r.id
    INNER JOIN
        sale_dates sd ON o.sale_id = sd.id
    WHERE
        h.id NOT IN (SELECT hotel_id FROM ranked_openings)
        AND o.stock > 0
    GROUP BY
        h.id
), ranked_previous_avaibilities AS (
SELECT 
        mrs.hotel_id,
        o.date,
        o.sale_id,
		o.discount_price,
		o.price,
		o.stock,
		FALSE AS is_available,
    	ROW_NUMBER() OVER (PARTITION BY mrs.hotel_id ORDER BY o.discount_price ASC) AS row_num
    FROM most_recent_sales_with_avaibility mrs
    INNER JOIN rooms r ON r.hotel_id = mrs.hotel_id
    INNER JOIN openings o ON o.room_id = r.id
    INNER JOIN sale_dates sd ON o.sale_id = sd.id AND sd.start_date = mrs.start_date
    WHERE o.stock > 0
), hotel_prices AS (
	SELECT 
	    hotel_id,
	    discount_price,
	    price,
	   	is_available  
	FROM ranked_openings ro
	WHERE row_num = 1
	UNION 
	SELECT 
	    hotel_id,
	    discount_price,
	    price,
	   	is_available  
	FROM ranked_previous_avaibilities rpa
	WHERE row_num = 1
) 
SELECT 
	h.id,
	h.name,
	h.preview,
	h.stars,
	h.picture_id,
  avg(r.score) AS reviews_avg_score,
  count(r.id) AS reviews_count,
	hp.price,
	hp.discount_price,
	hp.is_available
FROM hotel_prices hp
INNER JOIN hotels h ON hp.hotel_id = h.id
LEFT JOIN reviews r ON r.hotel_id = h.id
GROUP BY h.id, hp.price, hp.discount_price, hp.is_available;
    `);
  return camelCase(res.rows);
};
