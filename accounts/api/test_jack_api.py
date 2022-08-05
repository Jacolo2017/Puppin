from fastapi.testclient import TestClient
from db.accounts import AccountQueries
from unittest import TestCase
from .main import app
from routers.accounts import authenticate_user


class AccountData(TestCase):
    def authenticate_user(self, username, account_password):
        return ["test", "test"]


async def override_authorize_fake_user():
    return {
      "id": 1,
      "username": "fakeusername",
      "account_password": "fakepassword",
    }

app.dependency_overrides[authenticate_user] = override_authorize_fake_user

client = TestClient(app)


def test_login_failure():
    app.dependency_overrides[AccountQueries] = AccountData
    app.dependency_overrides[authenticate_user] = override_authorize_fake_user
    route = client.post(
        "/api/token",
        json={
          "username": "string",
          "account_password": "string",
            }
        )
    data = route.json()


app.dependency_overrides = {}
