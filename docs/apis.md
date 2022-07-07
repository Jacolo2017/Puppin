User 
Method:"POST"
path : /api/user

input:
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str(EmailField),
    "Password" : str,
    "DOB" : int(DateField)
}

output:
{
    "id": int,
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str,
    "Password" : str,
    "DOB" : int,
}

Update User
Method: "PUT"
path: /api/user/int:pk

input:
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str(EmailField),
    "Password" : str,
    "DOB" : int(DateField)
}

output:
{
    "Person" : str,
    "Dog" : str,
    "Email" : str,
    "Username" : str,
    "Password" : str,
    "DOB" : int,
}

Delete User
Method: "DELETE"
path: /api/user/int:pk

 output:
 {
    "response": str,
 }

List Users
Method: "GET"
path: /api/users

output:
{
    "id": int,
    "Username" : str,
    "Person" : str,
    "Dog" : str,
}

