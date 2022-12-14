\connect puppin

DROP TABLE if exists public.accounts;
DROP TABLE if exists public.dogs;

CREATE TABLE public.accounts(
    account_id serial NOT NULL PRIMARY KEY,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(30) NOT NULL,
    account_password character varying(500) NOT NULL,
    date_of_birth date NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(15) NOT NULL,
    gender character varying(20) NOT NULL,
    photo_url character varying(500) NOT NULL,
    about character varying(750) NOT NULL,
    UNIQUE(username)
);

CREATE TABLE public.dogs(
    dog_id serial NOT NULL PRIMARY KEY,
    dog_name character varying(30) NOT NULL,
    dog_breed character varying(50) NOT NULL,
    dog_age int NOT NULL,
    dog_gender character varying(30) NOT NULL,
    dog_photo character varying(500) NOT NULL,
    dog_temperament character varying(300) NOT NULL,
    dog_about character varying(750) NOT NULL,
    dog_size character varying(15) NOT NULL,
    dog_weight int NOT NULL,
    spayed_neutered BOOLEAN,
    vaccination_history character varying(750) NOT NULL,
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE
);

DROP TABLE if exists public.events;
DROP TABLE if exists public.reviews;
-- DROP TABLE if exists public.locations;
-- CREATE TABLE public.locations(
--     location_id serial NOT NULL PRIMARY KEY,
--     location_nickname character varying(30) NULL,
--     location_address character varying(100) NOT NULL,
--     location_street character varying(40) NOT NULL,
--     location_city character varying(30) NOT NULL,
--     location_state character varying(12),
--     location_zip int NOT NULL
-- );
CREATE TABLE public.events(
    event_id serial NOT NULL PRIMARY KEY,
    event_name character varying(100) NOT NULL,

    event_location character varying(100) NOT NULL,
    event_date_time TIMESTAMPTZ NOT NULL,
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE
);
   -- location_id serial,
    -- FOREIGN KEY (location_id) REFERENCES public.locations(location_id) ON DELETE CASCADE,
    -- UNIQUE(location_id)

CREATE TABLE public.reviews(
    review_id serial NOT NULL PRIMARY KEY,
    reviewer_username character varying(30) NOT NULL,
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE,
    review_event character varying(100) NOT NULL,
    event_id serial,
    FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE CASCADE,
    review_description character varying(750) NOT NULL,
    location_rating character varying(200)
);

CREATE TABLE public.eventsusersjunction(
    relationship_id serial NOT NULL PRIMARY KEY,
    event_id serial,
    FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE CASCADE,
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE,
    UNIQUE(event_id, account_id)
);

CREATE TABLE public.ratingaccountsinevents(
    reviewer_id serial,
    reviewed_id serial,
    event_id serial,
    FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE NO ACTION,
    rating BOOLEAN NULL
);

CREATE TABLE public.dogsinevents(
    account_id serial,
    FOREIGN KEY (account_id) REFERENCES public.accounts(account_id) ON DELETE CASCADE,
    event_id serial,
    FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE NO ACTION,
    dog_id serial,
    FOREIGN KEY (dog_id) REFERENCES public.dogs(dog_id) ON DELETE CASCADE
);
    

