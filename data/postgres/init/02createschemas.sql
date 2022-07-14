\connect puppin

DROP TABLE if exists public.accounts;

CREATE TABLE public.accounts(
    id serial NOT NULL PRIMARY KEY,
    first_name character varying(30),
    last_name character varying(30),
    email character varying(50,)
    username character varying(30),
    password character varying(50),
    
    

    

)






















DROP TABLE if exists public.events;

CREATE TABLE public.events(
    event_id serial NOT NULL PRIMARY KEY,
    event_name character varying(100) NOT NULL,
    event_location character varying(100) NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (location_nickname) REFERENCES public.location(location_nickname),
    event_accounts character varying(30) NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (username) REFERENCES public.accounts(username), 
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
)

CREATE TABLE public.reviews(
    review_id serial NOT NULL PRIMARY KEY,
    reviewer_username character varying(30) NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (username) REFERENCES public.accounts(username),
    review_event character varying(100) NOT NULL,
    PRIMARY KEY (review_id),
    FROEIGN KEY (event_name) REFERENCES public.events(event_name),
    attendee_rating BOOLEAN NOT NULL,
    review_description character varying(750) NOT NULL,
)

CREATE TABLE public.location(
    location_id serial NOT NULL PRIMARY KEY,
    location_nickname character varying(30) NOT NULL,
    location_address character varying(100) NOT NULL,
    location_street character varying(40) NOT NULL,
    location_city character varying(30) NOT NULL,
    location_state character varying(12),
    location_zip int NOT NULL,
)