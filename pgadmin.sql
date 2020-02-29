DROP TABLE missing_persons

CREATE TABLE missing_persons (
	age INT NOT NULL,
	city_last_seen VARCHAR (50) NOT NULL,
	first VARCHAR (50) NOT NULL,
	middle VARCHAR (50) NOT NULL,
	last VARCHAR (50) NOT NULL,
	image VARCHAR (75) NOT NULL, 
	county_last_seen VARCHAR (50) NOT NULL,
	race VARCHAR (50) NOT NULL,
	date_last_seen DATE NOT NULl,
	state_last_seen VARCHAR (50) NOT NULL,
	gender VARCHAR (50) NOT NULL,
	lat_long INT NOT NULL
	
);