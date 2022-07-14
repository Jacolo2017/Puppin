\connect puppin

DROP TABLE if exists public.accounts;

CREATE TABLE public.accounts(
    account_id serial NOT NULL PRIMARY KEY,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(50) NOT NULL,
    date_of_birth date NOT NULL,
    

)

CREATE TABLE public.dogs(
    dogid serial NOT NULL PRIMARY KEY,
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
    dogid FOREIGN KEY REFERENCES public.accounts(dogid) ON DELETE CASCADE;
)

