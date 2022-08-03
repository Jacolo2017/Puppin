import psycopg
from .pool import pool
from psycopg.errors import UniqueViolation


class DogQueries:
    def insert_dog(
        dog_name,
        dog_breed,
        dog_age,
        dog_gender,
        dog_photo,
        dog_temperament,
        dog_about,
        dog_size,
        dog_weight,
        spayed_neutered,
        vaccination_history,
        account_id,
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO dogs(dog_name, dog_breed, dog_age,
                        dog_gender, dog_photo, dog_temperament, dog_about,
                        dog_size, dog_weight, spayed_neutered,
                        vaccination_history, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, FALSE, %s, %s)
                    RETURNING dog_name, dog_breed, dog_age,
                        dog_gender, dog_photo, dog_temperament, dog_about,
                        dog_size, dog_weight, spayed_neutered,
                        vaccination_history, account_id
                    """,
                    [dog_name,
                    dog_breed,
                    dog_age,
                    dog_gender,
                    dog_photo,
                    dog_temperament,
                    dog_about,
                    dog_size,
                    dog_weight,
                    spayed_neutered,
                    vaccination_history,
                    account_id],
                )
                return cur.fetchall()
# Query to retrieve all dog information for larger queries related to profile
    def get_dogs_from_account_id(self, account_id: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        d.dog_id,
                        d.dog_name,
                        d.dog_about,
                        d.dog_size,
                        d.dog_age,
                        d.dog_gender,
                        a.account_id
                    FROM dogs AS d
                    WHERE d.account_id = %s
                    """,
                    [account_id]
                )
                dogs = cur.fetchall()
                return dogs

# Quick query to retrieve basic dog information
    def get_dog(self, dog_id: str):
        row = self.get_dogs_from_account_id(dog_id)
        if not row:
            return None
        return {"id": [0], "dog_name": [1], "dog_gender": [2]}

# Delete a dog from public.dogs based on account_id, dog_id, and dog_name all being present in the table's row
    def delete_dog(self, dog_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        DELETE FROM public.dogs
                        WHERE dog_id = %s
                    """,
                    [dog_id],
                )
