from db.accounts import AccountQueries
from unittest import TestCase
from main import app
from fastapi.testclient import TestClient
import pytest
from fastapi import (
    APIRouter,
    Response,
    status,
    Depends,
    HTTPException,
    Cookie,
    Request,
)

from unittest import mock

from routers.accounts import accounts_list
from unittest.mock import MagicMock


async def get_fake_account():
    return {1, "P", "A", "h", "K", "01-15-2001", "A", "A", "Male", "p", "I"}


class FakeAccountCreate(TestCase):
    def create_account(
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


async def common_parameters_acc(
    first_name: str,
    last_name: str,
    email: str,
    username: str,
    date_of_birth: str,
    city: str,
    state: str,
    gender: str,
    account_id: int,
    photo_url: str,
    about: str,
):
    return {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "username": username,
        "date_of_birth": date_of_birth,
        "city": city,
        "state": state,
        "gender": gender,
        "account_id": account_id,
        "photo_url": photo_url,
        "about": about,
    }


async def get_account_from_username(self, username: str):
    return {
        "first_name": "rog2er",
        "last_name": "rog2er",
        "email": "ro",
        "username": "K",
        "date_of_birth": "2021-08-03",
        "city": "roger",
        "state": "roger",
        "gender": "roger",
        "account_id": 1,
        "photo_url": "231312312",
        "about": "gangstuff",
    }


app.dependency_overrides[common_parameters_acc] = get_account_from_username
# async def get_fake_user(self, username: str):
#     return {
#         "id": 1,
#         "username": "K",
#         "account_password": "e",
#     }


# app.dependency_overrides[AccountQueries] = FakeAccountQuery


async def get_fake_account():
    return {
        "account_id": 1,
        "first_name": "P",
        "last_name": "A",
        "email": "h",
        "username": "K",
        "date_of_birth": "01-15-2001",
        "city": "A",
        "state": "A",
        "gender": "Male",
        "photo_url": "p",
        "about": "I",
    }


# app.dependency_overrides[AccountQueries] = get_fake_account()
# app.dependency_overrides[create_account] = create_fake_account

client = TestClient(app)


# def test_create_account_200():
#     app.dependency_overrides[AccountQueries] = FakeAccountCreate
#     res = client.post(
#         "/api/accounts",
#         json={
#             "first_name": "P",
#             "last_name": "A",
#             "email": "h",
#             "username": "K",
#             "account_password": "pleaseworkduig",
#             "date_of_birth": "01/15/2001",
#             "city": "A",
#             "state": "A",
#             "gender": "Male",
#             "photo_url": "p",
#             "about": "I",
#         },
#     )
#     # print("signifier", res.json())
#     assert res.status_code == 200
#     app.dependency_overrides = {}


# # this doesnt work in pipeline CI, commenting out for now
# def test_get_user_200():
#     print(client)
#     res = client.get("/api/accounts/by_username/K")
#     print("HERE:", res)
#     assert res.status_code == 200
#     app.dependency_overrides = {}


# create_fake_account(first_name="paul",
#  last_name="atreides", email="atreides@gmail.com",
#  username="pleaseworkdawg", account_password="Gangsta2",
# date_of_birth="01/15/2001", city="Atreides", state="AZ",
# gender="Male", photo_url="photo.url", about="I am some kinda haderech")
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
# class Tests(TestCase):
#     @mock.patch("tests.test_accounts_api.accounts_list", return_value=[
#         {
#             "account_id": 1,
#             "first_name": "roger",
#             "last_name": "roger",
#             "email": "ro",
#             "username": "roger"
#         },
#         {
#             "account_id": 2,
#             "first_name": "22",
#             "last_name": "22",
#             "email": "2",
#             "username": "22"
#         }])
#     def test_accounts_list(self, mockresults):
#         result = [
#         {
#             "account_id": 1,
#             "first_name": "roger",
#             "last_name": "roger",
#             "email": "ro",
#             "username": "roger"
#         },
#         {
#             "account_id": 2,
#             "first_name": "22",
#             "last_name": "22",
#             "email": "2",
#             "username": "22"
#         }]
        
#         # mock_con = mock_connect.return_value  # result of psycopg2.connect(**connection_stuff)
#         # mock_cur = mock_con.cursor.return_value  # result of con.cursor(cursor_factory=DictCursor)
#         # mock_cur.fetchall.return_value = expected  # return this when calling cur.fetchall()

#         expected = [
#         {
#             "account_id": 1,
#             "first_name": "roger",
#             "last_name": "roger",
#             "email": "ro",
#             "username": "roger"
#         },
#         {
#             "account_id": 2,
#             "first_name": "22",
#             "last_name": "22",
#             "email": "2",
#             "username": "22"
#         }]
#         print("result", result)
#         print("expected", expected)
#         self.assertEqual(expected, result)
class Tests(TestCase):  
    @mock.patch('routers.accounts.connect_to_db')
    def test_empty_accounts_list_test(self, mock_connect):
        expected = []
        mock_con_cm = mock_connect.return_value 
        mock_con = mock_con_cm.__enter__.return_value
        mock_cur_cm = mock_con.cursor.return_value
        mock_cur = mock_cur_cm.__enter__.return_value
        mock_cur.fetchall.return_value = expected

        self.assertEqual(accounts_list(), expected)

            

