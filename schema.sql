DROP TABLE IF EXISTS city;
CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude NUMERIC (9, 9),
    longitude NUMERIC (9, 9)
);

INSERT INTO city (search_query, formatted_query, longitude, latitude) VALUES ('test', 'test', 'test', 'test');

SELECT * FROM city;

