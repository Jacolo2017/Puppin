## July 11, 2022

Just a quick catch-up entry since I did not know about the journaling until the leanr was released. Last week we came up with the idea for the dog/person meetup site. We defined the basic structure and data model for the application. 

Today, The team screenshared to work on building the basic folder structure of the applications. We built three django applications for each of the microservices (accounts, events, reviews) as well as the react application to house the front end of the project. We were able to all start up with app with the database and the react in docker using docker compose. We worked out some kinks with the git branches and merges and defined a basic strategy for the git uploads (essentially following the guideline in "Git in a Group")

## July 12, 2022

Started to create django models for the profile side of the application "Users, Person, Dog". There is some speculation in the group whether to use a FastAPI/SQL to implement the microservice or using Django Models and REST APIs. Speaking with members of the previous group, got mixed answers on the way to implement the app. One group did a monolith while the other did almost all FastAPIs and SQL. Further discussion with the group needed.

## July 13, 2022

I started to draft the pedantic models, but kept running into git issues with the branches, especially when building the docker containers. Lots of __pycache__ errors causing me to constantly delete and remake branches. The group discussed had another moment of what strategy we wanted to use for the project, mainly a debate between familiar Django models vs experimenting with FastAPI and PSQL database. We took the night to research both and decide.

## July 14, 2022

Group unanimously decided that this is the time to learn and therefore went with FastAPI and PSQL. Learned something new about how git commits and branches working, making me realize how little I understood about it until this large project. I drafted the bulk of the Pydantic models to use with FastAPI and am feeling better about the project as a whole. The rest of the group is killing it so far and I am happy to be part of the team.

## July 15, 2022
Pair programming with Jack to get the FastAPI working. Created some new DB Query files and started drafting our accounts create fastAPI. It was slow going but referencing past projects was helpful.

## July 18 2022
Worked on creating the reviews-apis for create event review, get event review by review_id. Starting to feel like I'm understanding FastAPI better. The hard part is working the SQL database with 

## July 19 2022

Drafted three different APIs, get reviews by review ID, get all reviews by event, and update reviews. Ran into an issue getting the response to render correctly. The issue ended up being the parathensis around the SELECT statement in the, which created a tuple iwthin a tuple when the cursor went to fetch the data from the database.

## July 20 2022

Fixed a bug with the update review api, which only updates the review "body" but leaves the event, account, and attendee information un-editable. Talking with the group, started to create fastapis for delete event review, get event review by account id & event id, get all events for accounts_ID.



