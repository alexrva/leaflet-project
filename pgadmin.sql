DROP TABLE missing_persons;

CREATE TABLE missing_persons (
	age varchar(500),
	city_last_seen VARCHAR (500) ,
	first VARCHAR (500) ,
	middle VARCHAR (500),
	last VARCHAR (500) ,
	image VARCHAR (750), 
	county_last_seen VARCHAR (500),
	race VARCHAR (500) ,
	date_last_seen VARCHAR(500),
	state_last_seen VARCHAR (500),
	gender VARCHAR (500) ,
	lat_long VARCHAR (500)
	
);


COPY missing_persons(age,city_last_seen,first,middle,last,image,county_last_seen,race,date_last_seen,state_last_seen,gender,lat_long)
FROM '/Users/hannah-janehuntoon/git/leaflet-project/cleaned_csv.csv' DELIMITER ',' CSV HEADER;


select * from public.missing_persons;
