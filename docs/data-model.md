User (Person/Owner and Dog will be associated with this data/login)

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Person | string | yes | no |
| Dog | Foreign Key | yes | no |
| Email | string/email | yes | no |
| Username | string | yes | no |
| Password | string | yes | no |
| DOB | DateFeild | no | no |
| events | Foreign Key | yes | no |

Person/Owner(OneToMany with Dog)

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Owner_name | string | no | no   |
| City | string | no | no |
| State | string | no | no |
| Age | interger | no | no |
| Gender | string | no | no |
| Photo | string | no | no |
| About | textarea | no | no |

Dog(ManyToOne with Person/Owner) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Name | string | no | no |
| Breed | string(select) | no | no |
| Age | interger | no | no |
| Gender | string(select) | no | no |
| Photo | string | no | no |
| Temperament | textarea | no | no |
| About | textarea | no | no |
| Size | string(select) | no | no |
| Weight | interger | no | no |
| Spayed/Neutered | string(select) | no | no |
| Vacinated/Medical History | string(select)/boolean | no | no |

Event(Will pull information from Location Model) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Name | string | no | no |
| location | string | no | no |
| Person/Dog | string(Foreign Key) | no | no |
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

Review(Will be associated withthe event and person/owner) 

| Name | Type | Unique | Optional |
|------|------|--------|----------|
| Reviewer | ForeignKey | yes | no |
| Event | ForeignKey | yes | no |
| Attendee_Rating | interger | no | no |
| Description | textarea | no | no |
