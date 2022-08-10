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

    def get_account_from_username(self, username: str):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        a.account_id,
                        a.username,
                        a.account_password
                    FROM accounts AS a
                    WHERE a.username = %s
                    """,
                    [username],
                )
                account = cursor.fetchone()
                return account

    def get_user(self, username:str):
        row = self.get_account_from_username(username)
        if not row:
            return None
        return {"id": row[0], "username": row[1], "account_password": row[2]}
