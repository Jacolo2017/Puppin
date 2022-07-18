## July 11, 2022

* Structuring the back End

Today we worked on structuring the app's back end. Ultimately we rushed into the creation of our microservices, and had to end up re-creating all of our projects, apps, and Dockerfile.devs. Luckily we could keep our .yml file the same which was what we did for a majority of the morning. 

I am looking forward to really starting the app. I'm not sure what service I will end up building. From the reviews service there will be a lot of sharing data and I would like to try out a pub/sub relationship, which we haven't had the chance to work with yet. 

It would be nice to work with the accounts service as well. I have some personal projects lined up after graduation that focus on users being able to log in and hold all their data and maybe even update locational data based on where the app is opened. 

Events, well that's the project we made for last module so it would be the easiest, but at the same time I feel like I would have to push it to its most optimal form, since I have the experience in it. 

I think puppin has a lot of potential, especially with Mark, Cooper, and Roger working on it as well. We have already had philosophical discussions about the rating of humans and how the systems will be sharing and accessing each others data. I have electric butterflies in my stomach!

## July 12, 2022

Today we talked more about the database and app design. We looked into an researched fast api more just to see how we will communicate between apps. I ended up only doing a little bit of work and I will try to cary more of my weight and the others.

## July 13, 2022

We decided to test out fast api in our app. Now as we have finished initializing the docker we are setting up our back end and creating schemas. 

A few of us have looked into how the api will have to communicate between apps. It looks really difficult and I am questioning if we will be able to implement callbacks and two databases.

We found out that each app doesn't have to have it's own database so we might not have to use callbacks! We have decided that we will each research tonight, and come class tomorrow morning, will decide between Django or FastAPI. I hope we do fast api!

## July 14, 2022

We decided to do fast api for our app and are finally creating our schemas. Cooper is setting up our front end so we have a visual and the swagger data is accessible. Mark is building our pedantic functions, which to be honest I am reading up on now... oops. 

## July 18, 2022

Today was very productive. We revamped out fastAPI. Instead of numbering rows we just now use enumerate which Roger is a genius for thinking of! I personally implemented the create, get dog_id, and view all of an accounts dogs. It was quite easy now that I am getting better and more comfortable with how to make a fastAPI. It was interesting actually using a join in our app, and being more comfortable with SQL, to associate dogs based on account_id. I'm still a bit uncomfortable with with fastAPI, but tomorrow will be a good day to clean up that code and keep push through the project!

## July 19, 2022