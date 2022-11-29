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

#use fastapi testing. step by step

# this allows us to override current user with our user
# make a fake queries class, with function(s)  that force a specific return value
# override the app with what we want app.dependency_overrides[get_current_user] = override_get_fake_user
# we want to do two things: 1. cut off any dependencies this function has to our database by using our own. 2. make sure that impossible arguments (impossible in testing) such as "get current user" are overriden with our data
# get a response with client.post(/url/something, json={"Example": 0})
#now that we have overriden bad default dependencies, we can test our endpoint and see if it gives us the result we want, such as a 200. 
#we can even see if our return value is the same as the value we expect, given the json logic we give it
#we do this with assert response.json() == "something"

from unittest import mock

from routers.accounts import accounts_list
from unittest.mock import MagicMock


async def get_fake_account():
    return {1, "P", "A", "h", "K", "01-15-2001", "A", "A", "Male", "p", "I"}

fake_db = [
  {
    "account_id": 1,
    "first_name": "Amy",
    "last_name": "Amish",
    "email": "Ams@gmail.com",
    "username": "aurora"
  },
  {
    "account_id": 2,
    "first_name": "Cooper",
    "last_name": "Edgason",
    "email": "coopergg@gmail.com",
    "username": "cooper"
  },
  {
    "account_id": 3,
    "first_name": "Zoom",
    "last_name": "Hatrez",
    "email": "Zoomite3@gmail.com",
    "username": "jZoomirez"
  }]

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


class Tests(TestCase):  
    @mock.patch('routers.accounts.connect_to_db')
    def test_empty_accounts_list_test(self, mock_connect):
        expected = []
        mock_con_cm = mock_connect.return_value 
        mock_con = mock_con_cm.__enter__.return_value
        mock_cur_cm = mock_con.cursor.return_value
        mock_cur = mock_cur_cm.__enter__.return_value
        mock_cur.fetchallpytho.return_value = expected

        self.assertEqual(accounts_list(), expected)

            

