\connect puppin

DROP TABLE if exists public.accounts;
DROP TABLE if exists public.dogs;

CREATE TABLE public.accounts(
    account_id serial NOT NULL PRIMARY KEY,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(50) NOT NULL,
    date_of_birth date NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(15) NOT NULL,
    gender character varying(20) NOT NULL,
    photo_url character varying(100) NOT NULL,
    about character varying(750) NOT NULL
);

CREATE TABLE public.dogs(
    dog_id serial NOT NULL PRIMARY KEY,
    dog_name character varying(30) NOT NULL,
    dog_breed character varying(50) NOT NULL,
    dog_age int NOT NULL,
    dog_gender character varying(30) NOT NULL,
    dog_photo character varying(100) NOT NULL,
    dog_temperament character varying(300) NOT NULL,
    dog_about character varying(750) NOT NULL,
    dog_size character varying(15) NOT NULL,
    dog_weight int NOT NULL,
    spayed_neutered BIT NOT NULL,
    vaccination_history character varying(750) NOT NULL,
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE
);

DROP TABLE if exists public.events;

CREATE TABLE public.events(
    event_id serial NOT NULL PRIMARY KEY,
    event_name character varying(100) NOT NULL,
    event_location character varying(100) NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (location_nickname) REFERENCES public.location(location_nickname),
    event_accounts character varying(30) NOT NULL,
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
