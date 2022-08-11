from .events import join_event
from .events import get_all_users_and_dogs_from_event
from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from psycopg.errors import UniqueViolation
from typing import Union
import psycopg
from db.pool import pool

router = APIRouter()


class EventReviewIn(BaseModel):
    # review_event_id: int
    reviewer_username: str
    review_event: str
    review_description: str
    location_rating: str


# def row_to_reviews_list(row):
#     rating = {
#         "review_id": row[0],
#         "reviewer_username": row[1],
#         "account_id": row[2],
#         "review_event": row[3],
#         "event_id": row[4],
#         "review_description": row[5],
#         "location_rating": row[6]
#     }
#     return rating


class EventReviewUpdateIn(BaseModel):
    review_event: str
    review_description: str
    location_rating: int


class EventReviewUpdateOut(BaseModel):
    reviewer_username: str
    review_event_id: int
    review_event: str
    review_description: str
    location_rating: str


class ReviewDelete(BaseModel):
    result: bool


# --- Create new event review --- #
@router.post("/api/event/{event_id}/reviews/create")
def create_event_review(
    review: EventReviewIn, response: Response, account_id: int, event_id: int
):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """ 
                        INSERT INTO reviews
                        (account_id,
                        event_id,
                        reviewer_username,
                        review_event,
                        review_description,
                        location_rating)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING review_id, reviewer_username, account_id,
                        event_id, review_event, review_description, location_rating;
                    """,
                    [
                        account_id,
                        event_id,
                        review.reviewer_username,
                        review.review_event,
                        review.review_description,
                        review.location_rating,
                    ],
                )
            except psycopg.errors.UniqueViolation:
                # status values at https://github.com/encode/starlette/blob/master/starlette/status.py
                response.status_code = status.HTTP_409_CONFLICT
                return {"message": "Already reviewed"}
            row = cur.fetchone()
            record = {}

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record

            # reviews = cur.fetchall()
            # return {
            #     "reviews": [row_to_reviews_list(row) for row in reviews]
            # }


# --- Get an event review by review ID --- #
@router.get("/api/event/reviews/review={review_id}")
def get_review(review_id: int, response: Response):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            review_description,
                            location_rating
                        FROM reviews
                        WHERE review_id = %s;
                        """,
                    [review_id],
                )
                row = cur.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Review not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)


# --- Get all event reviews by event ID --- #
@router.get("/api/event/{event_id}/reviews/")
def get_event_reviews(event_id: int, response: Response):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            review_description,
                            location_rating
                        FROM reviews
                        WHERE event_id= %s;
                        """,
                    [event_id],
                )
                results = []
                print("do you see me?")
                for row in cur.fetchall():
                    if row is None:
                        response.status_code = status.HTTP_404_NOT_FOUND
                        return {"message": "Review not found"}
                    record = {}
                    for i, column in enumerate(cur.description):
                        # print("i, column: ", i, column)
                        record[column.name] = row[i]
                    results.append(record)
                return results
                # reviews = cur.fetchall()
                # print(reviews)
                # return {
                #     "reviews": [row_to_reviews_list(row) for row in reviews]
                # }
    except psycopg.InterfaceError as exc:
        print(exc.message)


# --- Get event review by event ID and account ID --- #
@router.get("/api/event/{event_id}/reviews/account={account_id}")
def get_account_reviews_per_event(account_id: int, event_id: int, response: Response):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            review_description,
                            location_rating
                        FROM reviews
                        WHERE account_id = %s AND event_id= %s;
                        """,
                    [account_id, event_id],
                )
                row = cur.fetchone()
                record = {}

                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)


# @router.get("/api/event/{event_id}/reviews/")
# def get_reviews_for_event(event_id: int, response: Response):
#     try:
#         with psycopg.connect() as conn:
#             with conn.cursor() as curr:
#                 cur.execute(
#                     """
#                     SELECT
#                         review_id,
#                         reviewer_username,
#                         account_id,
#                         review_event,
#                         event_id,
#                         attendee_rating,
#                         review_description,
#                         location_rating
#                     FROM reviews
#                     WHERE event_id= %s;
#                     """, [event_id]
#                 )
#                 row = cur.fetchall()
#                 record = {}

#                 for i, column in enumerate(cur.description):
#                     record[column.name] = row[i]
#                 return record


# --- Get all event reviews by account ID --- #
@router.get("/api/event/reviews/account={account_id}")
def get_event_reviews_for_account(account_id: int, response: Response):
    print("get_event_reviews_for_account pinged")
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            review_description,
                            location_rating
                        FROM reviews
                        WHERE account_id= %s;
                        """,
                    [account_id],
                )
                results = []
                print("do you see me?")
                for row in cur.fetchall():
                    if row is None:
                        response.status_code = status.HTTP_404_NOT_FOUND
                        return {"message": "Review not found"}
                    record = {}
                    for i, column in enumerate(cur.description):
                        # print("i, column: ", i, column)
                        record[column.name] = row[i]
                    results.append(record)
                return results
    except psycopg.InterfaceError as exc:
        print(exc.message)


# --- Delete review by review ID --- #
@router.delete("/api/event/reviews/{review_id}")
def update_review(review_id: int, account_id: int, response_model: ReviewDelete):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        DELETE FROM reviews
                        WHERE review_id = %s
                        """,
                    [review_id],
                )
        return {f"Review {review_id} deleted": True}
    except Exception:
        return {f"Review {review_id} deleted": False}


# --- Update a specific review by review ID --- #
@router.put("/api/event/reviews/{review_id}")
def update_review(
    review: EventReviewUpdateIn, review_id: int, account_id: int, response: Response
):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        UPDATE reviews
                        SET review_event = %s,
                            review_description = %s,
                            location_rating = %s
                        WHERE review_id = %s
                        RETURNING review_id, reviewer_username, account_id,
                        event_id, review_event, review_description,
                        location_zip, location_rating;
                        """,
                    [
                        review.review_event,
                        review.review_description,
                        review.location_rating,
                        review_id,
                    ],
                )
                row = cur.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Review not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)


@router.post("/api/event/{event_id}/reviews/{reviewed_id}/{reviewer_id}")
def rate_person_in_attended_event(
    reviewer_id: int, reviewed_id: int, event_id: int, rating: bool, response: Response
):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            # print(any(reviewed_id == reviewer_id for reviewed_id in get_all_users_from_event(event_id, response)))
            # if any(x == reviewer_id for x in get_all_users_from_event(event_id, response)) and any(x == reviewed_id for x in
            #                 get_all_users_from_event(event_id, response)):
            list_of_all_values = [
                value
                for elem in get_all_users_and_dogs_from_event(event_id, response)
                for value in elem.values()
            ]
            list_of_all_reviewers = [
                d["reviewer_id"]
                for d in get_all_ratings_from_specific_event(event_id, response)
                if "reviewer_id" in d
            ]
            if (
                reviewer_id in list_of_all_values
                and reviewed_id in list_of_all_values
                and reviewer_id not in list_of_all_reviewers
            ):
                cur.execute(
                    """
                INSERT INTO ratingaccountsinevents (reviewer_id, reviewed_id, event_id, rating)
                    VALUES(%s, %s, %s, %s)
                    RETURNING event_id, reviewer_id, reviewed_id, rating
                """,
                    [reviewer_id, reviewed_id, event_id, rating],
                )
                row = cur.fetchone()
                print(cur.description)
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Event or account not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
            else:
                return "you already reviewed this or their/your account does not exist"


@router.get("/api/events/{event_id}/ratings")
def get_all_ratings_from_specific_event(event_id: int, response: Response):

    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT * FROM ratingaccountsinevents
                WHERE
                event_id = %s

            """,
                [event_id],
            )
            results = []
            for row in cur.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(cur.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results


# end of file
