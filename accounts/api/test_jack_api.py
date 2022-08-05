import psycopg
from psycopg.errors import UniqueViolation
from db.dogs import DogQueries
from db.accounts import AccountQueries
from unittest import TestCase
from .main import app
from fastapi.testclient import TestClient


client = TestClient(app)


class FakeAccountQueries(TestCase):
    def get_account_by_username(self, account_id):
        return [17]


def override_update_account():
    return {
        "account_id": 17,
        "first_name": "ABC",
        "last_name": "CDE",  
    }


class FakeDogQueries(TestCase):
    def get_dog(self):
        return {"dog_id": 1}


client = TestClient(app)


def test_get_dog_200():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.get("/api/dog/1")
    assert res.status_code == 200

    app.dependency_overrides = {}


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
