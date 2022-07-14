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

