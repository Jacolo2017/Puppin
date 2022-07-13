# APIs

## User 
* **Method**:'POST'
* **path** : /api/user

input:
```json
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str(EmailField),
    "Password" : str,
    "DOB" : int(DateField)
    "events: dict
}
```
output:
```json
{
    "id": int,
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str,
    "Password" : str,
    "DOB" : int,
}
```
## Update User
* **Method**: 'PUT'
* **path**: /api/user/int:pk

input:
```json
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str(EmailField),
    "Password" : str,
    "DOB" : int(DateField)
}
```
output:
```json
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str,
    "Password" : str,
    "DOB" : int,
}
```

## Delete User
* **Method**: "DELETE"
* **path**: /api/user/int:pk

 output:
 ```json
 {
    "response": str,
 }
```
## List Users
* **Method**: "GET"
* **path**: /api/users

output:
 ```json
{
    "id": int,
    "Username" : str,
    "Person" : str,
    "Dog" : str,
}
```
## List Events
* **Method**: "GET"
* **path**: /api/events/
 ```json
{
    "id": int,
    "name": str,
    "host": str,
    "location": str,
    "attendees_count": int,
    "attendees": dict,
    "time": int,
    "date": int,
}
```


## Specific Events
* **Method**: "GET"
* **path**: /api/events/int:pk
 ```json
{
    "id": int,
    "name": str,
    "host": str,
    "location": dict,
    "attendees_count": int,
    "attendees": dict,
    "time": int,
    "date": int,
}
```

## Update Event
* **Method**: "Update"
* **path**: /api/events/int:pk
 ```json
{
    "Name": str,
    "Location": str,
    "Attendees": dict,
    "location": dict,
    "Time": int,
    "Date": int,
}
```
## Create Location
* **Method**: "Update"
* **path**: /api/events/locations
 ```json
{
    "Name": str,
    "Address": dict,
    "Picture_url": str,
}
```
## Create address
* **Method**: "Update"
* **path**: /api/events/locations/address
 ```json
{
    "Street": str,
    "City": str,
    "State": str,
    "Zip": int,
}
```
## List Reviews from event
* **Method**: "GET"
* **path**: /api/events/int:pk/reviews
 ```json
{
    "Id": int,
    "Person" : str,
    "Dog" : str,
    "Attendee_reviewed" : str,
    "Dog_reviewed": str,
    "Description": str,
    "Link_to_event_post" : str
}
```
