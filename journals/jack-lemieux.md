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

We decided to do fast api for our app and are finally creating our schemas. Cooper is setting up our front end so we have a visual and the swagger data is accessible. Mark is building our pydantic functions, which to be honest I am reading up on now... oops. 

## July 18, 2022

Today was very productive. We revamped out fastAPI. Instead of numbering rows we just now use enumerate which Roger is a genius for thinking of! I personally implemented the create, get dog_id, and view all of an accounts dogs. It was quite easy now that I am getting better and more comfortable with how to make a fastAPI. It was interesting actually using a join in our app, and being more comfortable with SQL, to associate dogs based on account_id. I'm still a bit uncomfortable with with fastAPI, but tomorrow will be a good day to clean up that code and keep push through the project!

## July 19, 2022

Today I ran into a road block. I am having issues, I guess confirming, that the currently singed in account will have it's id stored correctly in the public.dogs table. With SQL being something new to us, but also being fairly straight forward, I hope that this will only be a small road block and will shed some light into SQL and working directly in the tables themselves. 

## July 21, 2022

Honestly, I'm a little fried from the algorithms lecture today. it's super cool and I see how we have been making them the whole time just in lower complexity. I really see how our views could be considered algorithms. I have given up on trying to figure out how to make sure the account id is the one from the current account/owner account. As it turns out when I told Cooper that we could probably nock out authentication in a couple of hours, I was so so so wrong. This is a beast that is a little out of my brain capacity at the moment. The cook book is basically implemented but... it  doesn't work. We have been skimming docs and the code all day. 

## July 22, 2022

I'm so unfocused today and i feel like my productivity has just dropped after these road blocks we have run into. We are going to try all weekend to figure out how to get out auth to stick, work, just do anything really. It makes sense what it's doing but we are already so deep into the project that we are having to go line by line still to get it to work. And I haven't helped in the slightest, at least it feels like it. 

## July 25, 2022

Well, we have the account passwords being hashed thanks to Mark's genius. I can update a dog, I can delete a dog (I think) if I manually put in data to the public.dogs table but, I can not create a dog with the current users id. I have used CURRENT_USER, SUSER_ID, USER_ID, and DATABASE_PRINCIPAL_ID. No avail. I thought SQL would or seemed more straight forward at least early on in the project. But it is actually quite the opposite. Roger and Mark have been telling us to just not say things are going to be easy/short, because nothing has be lol. I went to a buddy's concert on  Friday night on a whim and ran into Mark! I really enjoy working with these guys, but feel like the worst player on one of the better teams. 

## July 26, 2022

There is nothing to say other than Roger and Cooper are geniuses. We don't know why, but the auth is working. Like fully working and it's so cool to see. I know this will have to be implemented sooner in any other apps I develope but it is so satisfying to have actually completed a major feature. It's been almost a full week since we haven't just pushed a form or two. Now onto the daemon of getting the hecking current user id in the public.dogs account_id row!

## July 27, 2022

First, I simply have been thinking too hard. I again am so thankful that we have Overrated to at least look at to conceptualize what needs to be implemented. I don't think I would have had such 'confidence' during the project with at least some completed app to look at. Mark helped me really understand that I just need to use user["id"] in the list call instead of trying to implement a function inside of the query. I can't believe how long it took me to basically revert a week of work. I need to slow down my thought process and go bit by bit like we did with auth. I just sprinted into finding a super complex way to implement a simple query's data. We ran into a new major issue today. Our auth is in out accounts app and we can't figure out a way to get it into the events app. We had all the SEIRs and instructors in our break out room helping us try to figure out what to do. Roger took Shawn's idea of creating a new router path that the events app can pull the information from. It was actually wild and one of Rogers SWE friends said it wasn't a bad idea or way to implement it in a small app like ours. I'm just glad we didn't have to set up an auxillary sever or de-microservice into a monolith lol. What a wild thing to write. 

## August 1, 2022

Last week to sprint through the final touches. Today I am finalizing all the CRUD for dogs and hopefully start and get a decent way into the public profile view. 

CRUD has been tested and is 100% operational (insert evil Palpatine laugh here). Now to dive into the front end and create the profile pages. the user view of their profile has run into a road bump. I need to map both accountData and dogData. I can't have two map functions without breaking the page. I'm working with the idea of flat mapping and I hope it will work out, but I am not really sure to be honest. I am planning on reaching out to Zhyn to see if she has some insights, her breathing JS and all.  

## August 2, 2022

Sometimes I just really need to slow down. I had the delete completely functional I was just missing one parameter. Roger is the cool headed leader I think our group really needed. In other news, Cooper and I spent almost an hour trying to map data in our profile page only to realize we were mapping an object not  an array. We realized, with the help of Tristen, we can use a ?: based function in our JSX directly. We just had to look back at how we made our project beta and called multiple data sets and used them in the JSX. 

## August 3, 2022

Oh my god. You ever make a api view that doesn't return the data you needed, and try to use that to get that data back? I had a fully functioning Account Update form set since around 12:45 cohort time, just needed to add in account_id to my api view... I'll take it as a win. We have a full profile page, showing all the proper information. Our reviews are set and associate with accounts and events. The project is almost done but it feels like there is so much left to do.

Much of the stuff that we want to still implement are stretch goals but we all managed to forget to make it possible to join an event LOL. Cooper is a CSS god to say the least, and when both of us get together we make some of the cleanest UIs I have ever seen (just tooting our horn a little lol).

