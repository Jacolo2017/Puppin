import psycopg
from psycopg.errors import UniqueViolation
from db.dogs import DogQueries
from db.accounts import AccountQueries
from unittest import TestCase
from .main import app
from fastapi.testclient import TestClient


class FakeAccountQueries(TestCase):
    def insert_account(
        self,
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
        return {    # assert res.json() == {
        "account_id": 17,
        "first_name": "Paul",
        "last_name": "Atreides",
        "email": "houseatreides@email.com",
        "date_of_birth": "01/15/2001",
        "city": "Atreides",
        "state": "AR",
        "gender": "Male",
        "photo_url": "photo.url",
        "about": "I am the Kwisatz Haderach. That is reason enough."
    }


        def get_user(self, account_id, username, account_password):
            return {"account_id": 17,
                    "username": "Kwisatz",
                    "account_password": "HouseAtredeis4lyfe" 
                    }

#  first_name": "Paul", "last_name": "Atreides", "email": "houseatreides@email.com", "date_of_birth": "01/15/2001", "city": "Atreides", "state": "AR", "gender": "Male", "account_id": 17, "photo_url": "photo.url", "about": "I am the Kwisatz Haderach. That is reason enough."


class FakeDogQueries(TestCase):
    def get_dog(self):
        return {"dog_id": 1}


client = TestClient(app)


def test_get_dog_200():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.get("/api/dog/1")
    assert res.status_code == 200

    app.dependency_overrides = {}


def test_get_account_200():
    app.dependency_overrides[AccountQueries] = FakeAccountQueries
    res = client.get("/api/accounts/17")
    assert res.status_code == 200

    app.dependency_overrides = {}



    # assert res.json() == {
    #     "account_id": 17,
    #     "first_name": "Paul",
    #     "last_name": "Atreides",
    #     "email": "houseatreides@email.com",
    #     "date_of_birth": "01/15/2001",
    #     "city": "Atreides",
    #     "state": "AR",
    #     "gender": "Male",
    #     "photo_url": "photo.url",
    #     "about": "I am the Kwisatz Haderach. That is reason enough."
    # }

# def test_login_failure():
#     app.dependency_overrides[AccountQueries] = AccountData
#     app.dependency_overrides[authenticate_user] = override_authorize_fake_user
#     route = client.post(
#         "/api/token",
#         json={
#             "username": "string",
#             "account_password": "string",
#         }
#     )
#     data = route.json()
