from ..db.accounts import AccountQueries
from unittest import TestCase
from ..main import app
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
from ..routers.accounts import get_current_user, create_dog
from ..db.dogs import DogQueries
from fastapi import FastAPI
from ..routers import accounts

#use fastapi testing. step by step

# this allows us to override current user with our user
#if you're overriding a function. write a fake function
#if you're overriding a function in a class, write a fake class with a fake function
# override the app with what we want app.dependency_overrides[get_current_user] = override_get_fake_user
# we want to do two things: 1. cut off any dependencies this function has to our database by using our own. 2. make sure that impossible arguments (impossible in testing) such as "get current user" are overriden with our data
# get a response with client.post(/url/something, json={"Example": 0})
#now that we have overriden bad default dependencies, we can test our endpoint and see if it gives us the result we want, such as a 200. 
#we can even see if our return value is the same as the value we expect, given the json logic we give it
#we do this with assert response.json() == "something"

#if we want to make a dependency only last within a function, put it in the function. if we want it globally set put it outside.



from unittest import mock


from unittest.mock import MagicMock

def override_get_fake_user():
    return {
        "id": 2,
        "username": "user2",
        "account_password": "somehashedthing"
    }
    #python -m pytest tests/
class TestDogQueries:
    def insert_dog(self,
        dog_name,
        dog_breed,
        dog_age,
        dog_gender,
        dog_photo,
        dog_temperament,
        dog_about,
        dog_size,
        dog_weight,
        spayed_neutered,
        vaccination_history,
        account_id,
    ):
        return {
            "dog_name": "Silly",
            "dog_breed": "Martese",
            "dog_age": 3,
            "dog_gender": "Make",
            "dog_photo": "TINYURL.com/dog2",
            "dog_temperament": "Happy",
            "dog_about": "Relaxed",
            "dog_size": "big",
            "dog_weight": 60,
            "spayed_neutered": "true",
            "vaccination_history": "Up to date"
            }

# def override_create_dog():
#     return {"dog_name": "Silly",
#             "dog_breed": "Martese",
#             "dog_age": 3,
#             "dog_gender": "Make",
#             "dog_photo": "TINYURL.com/dog2",
#             "dog_temperament": "Happy",
#             "dog_about": "Relaxed",
#             "dog_size": "big",
#             "dog_weight": 60,
#             "spayed_neutered": True,
#             "vaccination_history": "Up to date", "account_id": 2}

async def get_fake_account():
    return {1, "P", "A", "h", "K", "01-15-2001", "A", "A", "Male", "p", "I"}


app = FastAPI()
app.include_router(accounts.router)
app.dependency_overrides[get_current_user] = override_get_fake_user
# app.dependency_overrides[create_dog] = override_create_dog
app.dependency_overrides[DogQueries] = TestDogQueries
client = TestClient(app)

def test_create_dog_with_fake_curr_user():
    # app.dependency_overrides[get_current_user] = override_get_fake_user
    # app.dependency_overrides[DogQueries] = TestDogQueries
    r = client.post("/api/dog/create", json={"dog_name": "Silly",
            "dog_breed": "Martese",
            "dog_age": 3,
            "dog_gender": "Make",
            "dog_photo": "TINYURL.com/dog2",
            "dog_temperament": "Happy",
            "dog_about": "Relaxed",
            "dog_size": "big",
            "dog_weight": 60,
            "spayed_neutered": True,
            "vaccination_history": "Up to date"})
    replybody = r.json()
    print(replybody)
    assert r.status_code == 200
    assert replybody == {"dog_name": "Silly",
            "dog_breed": "Martese",
            "dog_age": 3,
            "dog_gender": "Make",
            "dog_photo": "TINYURL.com/dog2",
            "dog_temperament": "Happy",
            "dog_about": "Relaxed",
            "dog_size": "big",
            "dog_weight": 60,
            "spayed_neutered": True,
            "vaccination_history": "Up to date", "account_id": 2}





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




