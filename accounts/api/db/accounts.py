import psycopg
from .pool import pool
from psycopg.errors import UniqueViolation


class DuplicateUsername(RuntimeError):
    pass


class AccountQueries:
    def insert_account(
        first_name,
        last_name,
        email,
        username,
        account_password,
        date_of_birth,
        city,
        state,
        gender,
        photo_url,
        about,
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                            INSERT INTO profiles(
                                first_name, last_name, email, username,
                                account_password, date_of_birth, city, state,
                                gender, photo_url, about)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,)
                            RETURNING first_name, last_name, email, username,
                                account_password, date_of_birth, city, state,
                                gender, photo_url, about
                            """,
                        [
                            first_name,
                            last_name,
                            email,
                            username,
                            account_password,
                            date_of_birth,
                            city,
                            state,
                            gender,
                            photo_url,
                            about,
                        ],
                    )
                    return cur.fetchall()
                except UniqueViolation:
                    raise DuplicateUsername
