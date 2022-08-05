__aug 6:__
Things are going but unit tests seem to be harder than they should be. Also thinking of making the whole project a monolith because right now it seems weird at best and damaging at worst. 

__aug 5:__

Made it so the page validates that you are already in the event before showing a join button. Had to do a conditional function for a ternary to even activate. That ternary required a check which required something which loaded is very fast. Wondering if theres a better way to ensure something is loaded before executing rather than nailing in planks on every leak, but it seems to be standard. 

__Aug 4:__
Wow...Just wow. I feel like I did alot and so little at the same time. I did a ton of validation for join_event by calling functions within that endpoint and using list comprehension on them. It was definitely satisfying but
also felt uncertain how useful it was. I'm also making more endpoints to get those validation checks since we didn't have what I wanted. Somewhat worried about clogging up the api in an unorganized fashion. Getting people to show up on event cards was TOUGH. I had to make another promise.all fetch and map it out to merge with the eventData. The thing is though, I had to use list comprehension, 
and list comprehension is much different in js than python. I forgot that .includes() exists. I keep thinking if there is a better way than merging relevant info into states in front-end, but you can't make lists as an attribute type
in tables. I thought about that when I first started this project actually. Is there a better way than what I'm doing though? Can't say, but I had a vision and that vision came through. Does javascript really not have an "if x in list"? Am I going crazy? Stay tuned next time. I believe I also worked on review sliders today and got them working. 

__Aug 3:__
Figured out how to two dictionaries within a promise. A triple nested for loop inside a .then promise, I'm not sure its the most efficient way to do it but it works. The problem was that 
reviews have an event_id and events have an event_id but they need be merged within a promise or else one may resolve before another and break the merge. It was very satisfying to figure out!

__Aug 2:__ passing props can get insane when fetches rely on them. I had to do props.userData.length != 0 to get the order right. That was very frustrating but satisfying to solve. Reviews by any user now shows any user's review via props passed down from the public profile. 


__Aug 1:__ Found out about use Params! Now we can have every user get a dynamically generated profile link. Such a brilliant hook. Worked on the review sliders as well, the hardest one is definitely the "reviews by any user" one. 
We have to account for any possible user but we can pass them as props. 

__july 30:__
Making date and time together. Easier to work with date objects than to build dates with individualized strings. Also, made fetching user's dogs based off get current user from token. Need to make fetching token and then the user id one cohesive fetch.

___july 29__ : figured out how to get user info with an api call on the front end. We just have to pass a token into the get current user api function. The problem was that the auth is in the accounts service but not in events. 

__july 28__: Trying to get auth working. Questioning whether or not to make everything a monolith or to use api calls. Microservice format isn't benefitting, and using a shared database makes the whole operation walking a tight rope without benefit.

__july 24__ : Getting auth to work is slowing us down quite a bit. We are reliant on auth to work on pages that are tied to users. Hoping to get it work but the end is not in sight.

__july 22__: Using list comprehension in backend to validate that users are already in an event. Its an api call within an api call! Very interesting. I feel like we are making progress.

__july 21__:

It looks like we are making some great progress with the backend, Cooper is doing some mysterious yet great things on the backend with no api calls. Seems like when we start frontend things will go smoothly!

__july 18:__

Fixed the junction table, added api function to get all events associated with user

__july 17__

Wrote the api for accoutns (get specific, get list, create one). I don't like the hardcode method to returning results, so I'm opting for returning a dynamically created dictionary from an enumerated cursor description. 

I think keeping things on one file and then separating them later is the best move. (that is, models)

Heres a big one as well, I went ahead and removed the initializer table for locations. As of right now it doesn't make much sense to have a dependency on location since we need to figure out pulling data from an api but how we are doign that. It will slow down the dev process. 

__july 15__

Figured out how to avoid hot tables. As long as only one microservice talks to one table, the table won't be a hot table. If multiple microservices query from the same table, 
that is acceptable. The whole issue of hot tables is when two different microservices try to do a similar operation. For example, if both microservices were editing the users table, that would be a problem. That would result in a high probability of data mismatch/invalidation.

Don't query junction table from events, only users.
rather than querying expensive searching every time you want to look at a user's events' reviews every second, it queries it every 60 seconds


thing to look into:
astro (deployment)

cassandra (database)
nextjs (meta framework of react) good way to deploy static pages age

__July 13__: Fastapi is brutal but reasonable. A missing indent can be the problem sometimes.

__July 12__

We are currently thinking of shrinking our microservices from 3 to 2 and changing from django rest framework to FastAPI. Pros and cons are still being weighted but shrinking the microservices seems for the best. A monolith is also under consideration as well. Today I also got the docker container for events to work and created data models for events (even if we switch to fastapi, it won't be too much of a drawback).






s 











