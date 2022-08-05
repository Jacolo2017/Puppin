import psycopg
from psycopg.errors import UniqueViolation
from db.dogs import DogQueries
from unittest import TestCase
from .main import app
from fastapi.testclient import TestClient


client = TestClient(app)


class FakeDogQueries(TestCase):
    def get_dog(self):
        return {"dog_id": 10, "dog_name": "Lillie", "dog_gender": "Female"}


def test_get_dog_422():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    res = client.get("/api/dog/{dog_id}")
    assert res.status_code == 422

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



