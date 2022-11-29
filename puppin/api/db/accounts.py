import psycopg
from .pool import pool, connect_to_db
from psycopg.errors import UniqueViolation
from fastapi import (
    APIRouter,
    Response,
    status,
    Depends,
    HTTPException,
    Cookie,
    Request,
)

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

    def get_list_of_accounts(self, page: int = 0):
        # Uses the environment variables to connect
    # In development, see the docker-compose.yml file for
    #   the PG settings in the "environment" section
        print(type(pool.connection))
        pooler = connect_to_db()
        with pooler.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT account_id, first_name, last_name, email, username
                    FROM accounts
                    ORDER BY account_id
                    LIMIT 100 OFFSET %s;
                """,
                    [page * 100],
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                cur.execute(
                    """
                    SELECT COUNT(*) FROM accounts;
                """
                )
                # raw_count = cur.fetchone()[0]
                # page_count = (raw_count // 100) + 1
                print("goated")
                # return Accounts(page_count=page_count, accounts=results)
                return results
    def get_account(self, account_id: int, response: Response):
        try:
            print("okay we tried")
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                            SELECT account_id, first_name, last_name, email, username,
                            date_of_birth, city, state, gender,
                                photo_url, about
                            FROM accounts
                            WHERE account_id = %s;
                            """,
                        [account_id],
                    )
                    row = cur.fetchone()
                    print("lookhere", (cur.description))
                    if row is None:
                        response.status_code = status.HTTP_404_NOT_FOUND
                        return {"message": "Account not found"}
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return record
        except psycopg.InterfaceError as exc:
            print(exc.message)

