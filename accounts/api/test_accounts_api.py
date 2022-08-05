from db.dogs import DogQueries
from db.accounts import AccountQueries
from unittest import TestCase
from main import app
from fastapi.testclient import TestClient
from routers.accounts import create_account, get_account, get_account_by_username


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


async def create_fake_account(
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
    return [
        "a",
        "a",
        "a",
        "a",
        "a",
        "08-26-1998",
        "a",
        "a",
        "a",
        "a",
        "a",
    ]


class FakeAccountQuery(TestCase):
    def get_fake_user(self, username: str):
        return {
            "id": 1,
            "username": "K",
            "account_password": "e",
        }


async def get_fake_user(self, username: str):
    return {
        "id": 1,
        "username": "K",
        "account_password": "e",
    }


app.dependency_overrides[AccountQueries] = FakeAccountQuery

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
app.dependency_overrides[create_account] = create_fake_account

client = TestClient(app)


def test_get_user_200():
    app.dependency_overrides[AccountQueries] = FakeAccountQuery
    app.dependency_overrides[get_account_by_username] = get_fake_user
    print(client)
    res = client.get("/api/accounts/1")
    print("HERE:", res)
    assert res.status_code == 200
    app.dependency_overrides = {}
#  python -m pytest test_jack_api.py

def test_create_account_200():
    app.dependency_overrides[create_fake_account] = create_account
    res = client.post("/api/accounts",
                    json={
                        "first_name": "Paul",
                        "last_name": "Atreides",
                        "email": "houseatreides@email.com",
                        "username": "PLEASEWORKFORTHELOVEOFGODDESS",
                        "account_password": "HouseAtredeis4lyfe",
                        "date_of_birth": "01/15/2001",
                        "city": "Atreides",
                        "state": "AR",
                        "gender": "Male",
                        "photo_url": "photo.url",
                        "about": "I am the Kwisatz Haderach. That is reason enough.",
                        "account_id": 3,
                    })
    print(res.json())
    assert res.status_code == 200
    app.dependency_overrides = {}
