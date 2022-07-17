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