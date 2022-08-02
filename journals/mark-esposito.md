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

## July 21 2022
Added a get event reviews by account ID fastAPI. Updated the backend to reflect a change in which we no longer are reviewing or tracking the locations of events anymore. This involved updating the PSQL tables, modifying existing APIs, and updating the design docs. Feeling ood about the project, as we are about to transition from workign on the backend to the front end.


## July 24 2022
Started working on the front end by drafting up the dog form. Cooper's work on sign-up was a great reference for creating the form and spanning the form across two pages. A tricky portion of the form was pulling in a list of dog breeds from a 3rd party API. I converted the response from that API into a list, but not sure if that is the best way to go about it. However it does seem to work from what I can tell. Since our authentication is not working right now, I wasn't able to figure out how to put in the account ID into the form submission at this time.

## July 25 2022
As a team, we troubleshot our authentication, which has probably been the biggest challenge to implement up until this point, as no one on the team has ever done it and only had to reference past modules team projects and a "cookbook" realeased by Galvanize. As a team we were able to figure out about 90% of it before calling it a day. Later that night I was able to get the last little bit working. Feels good being able to contribute.

## July 26 2022
Authentication appears to be working! However, no one on the team can seem to figure out why. The suspecting line that "solved" it was later removed and everything still worked. Going to finish up the dog form and move on from there. We still have a long way to go.

## July 27 2022
Pressure is starting to mount. I'm working on the event form which seems simple enough but calls for a bunch of different data coming together. Likely going to need to create a new API to get the events that the user has signed in to. Even though the authentication is working, we are struggling to figure when/where to use it and pull the user data from tokens. NGL, I'm pretty frustrated with the project.


