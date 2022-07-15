User (Person/Owner and Dog will be associated with this data/login)

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Dog | Foreign Key | yes | no |
| Email | string/email | yes | no |
| Username | string | yes | no |
| Password | string | yes | no |
| DOB | DateField | no | no |
| first_name | string | no | no   |
| last_name | string | no | no   |
| City | string | no | no |
| State | string | no | no |
| Gender | string | no | no |
| Photo | string | no | no |
| About | textarea | no | yes |

Dog(ManyToOne with Person/Owner) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Name | string | no | no |
| Breed | string(select) | no | no |
| Age | integer | no | no |
| Gender | string(select) | no | no |
| Photo | string | no | no |
| Temperament | textarea | no | no |
| About | textarea | no | no |
| Size | string(select) | no | no |
| Weight | integer | no | no |
| Vaccinated/Medical History | string(select)/boolean | no | no |
| Account Id | integer(serial) | no | no |

Event(Will pull information from Location Model) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Name | string | no | no |
| location | string(serial) | no | no |
| Accounts | string(Foreign Key) | no | no |
| Time | DateTime | no | no |
| Date | DateTime | no | no |

Location

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Nickname | string | no | no |
| Address | string | no | no |
| Add(Street) | string | no | no |
| Add(City) | string | no | no |
| Add(State) | string | no | no |
| Add(Zip) | string | no | no |

Review(Will be associated with the event and person/owner) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Reviewer | ForeignKey | yes | no |
| Account ID| integer (serial) | yes | no |
| Event | ForeignKey(serial) | yes | no |
| Attendee_Rating | integer | no | no |
| Description | textarea | no | no |
| Location Zip | integer | no | no |
| Location Rating | integer | no | no |

    location_id serial,
    FOREIGN KEY (location_id) REFERENCES public.locations(location_id) ON DELETE CASCADE,