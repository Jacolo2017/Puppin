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
