July 12

We are currently thinking of shrinking our microservices from 3 to 2 and changing from django rest framework to FastAPI. Pros and cons are still being weighted but shrinking the microservices seems for the best. A monolith is also under consideration as well. Today I also got the docker container for events to work and created data models for events (even if we switch to fastapi, it won't be too much of a drawback).

july 15

Figured out how to avoid hot tables. As long as only one microservice talks to one table, the table won't be a hot table. If multiple microservices query from the same table, 
that is acceptable. The whole issue of hot tables is when two different microservices try to do a similar operation. For example, if both microservices were editing the users table, that would be a problem. That would result in a high probability of data mismatch/invalidation.

Don't query junction table from events, only users.
rather than querying expensive searching every time you want to look at a user's events' reviews every second, it queries it every 60 seconds


thing to look into:
astro (deployment)

cassandra (database)
nextjs (meta framework of react) good way to deploy static pages ages 

july 17

Wrote the api for accoutns (get specific, get list, create one). I don't like the hardcode method to returning results, so I'm opting for returning a dynamically created dictionary from an enumerated cursor description. 

I think keeping things on one file and then separating them later is the best move. (that is, models)

Heres a big one as well, I went ahead and removed the initializer table for locations. As of right now it doesn't make much sense to have a dependency on location since we need to figure out pulling data from an api but how we are doign that. It will slow down the dev process. 

july 18:

Fixed the junction table, added api function to get all events associated with user

july 29:
Making date and time together. Easier to work with date objects than to build dates with individualized strings. Also, made fetching user's dogs based off get current user from token. Need to make fetching token and then the user id one cohesive fetch.


Aug 1: Found out about use Params! Now we can have every user get a dynamically generated profile link. Such a brilliant hook. Worked on the review sliders as well, the hardest one is definitely the "reviews by any user" one. 
We have to account for any possible user but we can pass them as props. 

Aug 2: passing props can get insane when fetches rely on them. I had to do props.userData.length != 0 to get the order right. That was very frustrating but satisfying to solve. Reviews by any user now shows any user's review via props passed down from the public profile. 

Aug 3: 
Figured out how to two dictionaries within a promise. A triple nested for loop inside a .then promise, I'm not sure its the most efficient way to do it but it works. The problem was that 
reviews have an event_id and events have an event_id but they need be merged within a promise or else one may resolve before another and break the merge. It was very satisfying to figure out!

Aug 4:
Wow...Just wow. I feel like I did alot and so little at the same time. I did a ton of validation for join_event by calling functions within that endpoint and using list comprehension on them. It was definitely satisfying but
also felt uncertain how useful it was. I'm also making more endpoints to get those validation checks since we didn't have what I wanted. Somewhat worried about clogging up the api in an unorganized fashion. Getting people to show up on event cards was TOUGH. I had to make another promise.all fetch and map it out to merge with the eventData. The thing is though, I had to use list comprehension, 
and list comprehension is much different in js than python. I forgot that .includes() exists. I keep thinking if there is a better way than merging relevant info into states in front-end, but you can't make lists as an attribute type
in tables. I thought about that when I first started this project actually. Is there a better way than what I'm doing though? Can't say, but I had a vision and that vision came through. Does javascript really not have an "if x in list"? Am I going crazy? Stay tuned next time. I believe I also worked on review sliders today and got them working. 