import psycopg
from .pool import pool



class AccountQueries:
    def insert_profile(
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
                            RETURNING id, username,
                                email, password, first_name,
                                last_name, location, date_of_birth
                            """,
                            [
                            first_name,
                            last_name,
                            email,
                            username,
                            password,
                            date_of_birth,
                            city,
                            state,
                            gender,
                            photo_url,
                            about,
                            ],
                        )
                        profiles = list(cursor.fetchone())
                        for pfence in pfences.interested:
                            cursor.execute(
                                """
                                INSERT INTO interested(profile_id, interest)
                                VALUES(%s, %s)
                                """,
                                [profiles[0], pfence],
                            )
                        profiles.append(pfences.interested)
                        return profiles
                    except UniqueViolation:
                        raise DuplicateUsername