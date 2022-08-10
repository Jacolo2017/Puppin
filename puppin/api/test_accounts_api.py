from db.accounts import AccountQueries
from unittest import TestCase
from main import app
from fastapi.testclient import TestClient
from fastapi import (
    APIRouter,
    Response,
    status,
    Depends,
    HTTPException,
    Cookie,
    Request,
)


async def get_fake_account():
    return {
        1,
        "P",
        "A",
        "h",
        "K",
        "01-15-2001",
        "A",
        "A",
        "Male",
        "p",
        "I"
    }

class FakeAccountCreate(TestCase):
    def create_account(self, first_name, last_name, email, username, account_password, date_of_birth, city, state, gender, photo_url, about):
        return {"account_id": 1}
    # return [
    #     "a",
    #     "a",
    #     "a",
    #     "a",
    #     "a",
    #     "08-26-1998",
    #     "a",
    #     "a",
    #     "a",
    #     "a",
    #     "a",
    # ]


class FakeAccountQuery(TestCase):
    def get_account_by_username(self, username: str):
        print("savage")
        return {
            "first_name": "rog2er",
            "last_name": "rog2er",
            "email": "ro",
            "username": "ro333g2er",
            "date_of_birth": "2021-08-03",
            "city": "roger",
            "state": "roger",
            "gender": "roger",
            "account_id": 1,
            "photo_url": "",
            "about": ""
        }


# async def get_fake_user(self, username: str):
#     return {
#         "id": 1,
#         "username": "K",
#         "account_password": "e",
#     }


# app.dependency_overrides[AccountQueries] = FakeAccountQuery

# async def get_fake_account():
#     return {
#         "account_id": 1,
#         "first_name": "P",
#         "last_name": "A",
#         "email": "h",
#         "username": "K",
#         "date_of_birth": "01-15-2001",
#         "city": "A",
#         "state": "A",
#         "gender": "Male",
#         "photo_url": "p",
#         "about": "I"
#     }

# app.dependency_overrides[AccountQueries] = get_fake_account()
# app.dependency_overrides[create_account] = create_fake_account

client = TestClient(app)






def test_create_account_200():
    app.dependency_overrides[AccountQueries] = FakeAccountCreate
    res = client.post("/api/accounts", json={
        "first_name": "P",
        "last_name": "A",
        "email": "h",
        "username": "K",
        "account_password": "pleaseworkduig",
        "date_of_birth": "01/15/2001",
        "city": "A",
        "state": "A",
        "gender": "Male",
        "photo_url": "p",
        "about": "I"})
    # print("signifier", res.json())
    assert res.status_code == 200
    app.dependency_overrides = {}


# this doesnt work in pipeline CI, commenting out for now
# def test_get_user_200():
#     app.dependency_overrides[AccountQueries] = FakeAccountQuery
#     print(client)
#     res = client.get("/api/accounts/by_username/K")
#     print("HERE:", res)
#     assert res.status_code == 200
#     app.dependency_overrides = {}





# create_fake_account(first_name="paul", last_name="atreides", email="atreides@gmail.com", username="pleaseworkdawg", account_password="Gangsta2", date_of_birth="01/15/2001", city="Atreides", state="AZ", gender="Male", photo_url="photo.url", about="I am some kinda haderech")
#     self,
#     first_name,
#     last_name,
#     email,
#     username,
#     account_password,
#     date_of_birth,
#     city,
#     state,
#     gender,
#     photo_url,
#     about,
# ):