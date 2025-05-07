# User API Spec

## Register User

Enpoint : POST /api/users

Request Body:

```
{
    "username": "lail",
    "password": "secret",
    "name": "laili kumala"
}
```

Response Body (Success):

```
{
    "data": {
        "username": "lail",
        "name": "laili kumala"
    }
}
```

Response Body (Failed):

```
{
    "errors": "username already registered"
}
```

## Login User

Enpoint : POST /api/users/login

Request Body:

```
{
    "username": "lail",
    "password": "secret",
}
```

Response Body (Success):

```
{
    "data": {
        "username": "lail",
        "name": "laili kumala",
        "token": "session_id_generated"
    }
}
```

Response Body (Failed):

```
{
    "errors": "username or password is wrong"
}
```

## Get User

Enpoint : GET /api/users/current

Headers :

 - Authourization: token

Response Body (Success):

```
{
    "data": {
        "username": "lail",
        "name": "laili kumala",
    }
}
```

Response Body (Failed):

```
{
    "errors": "Unauthorized"
}
```

## Update User

Enpoint : PATCH /api/users/current

Headers :

 - Authourization: token

Request Body:

```
{
    "password": "secret", // optional, if want to change password
    "name": "laili kumala", // optional, if want to change name
}
```

Response Body (Success):

```
{
    "data": {
        "username": "lail",
        "name": "laili kumala"
    }
}
```

Response Body (Failed):

```
{
    "errors": "Unauthorized"
}
```

## Logout User

Enpoint : DELETE /api/users/current

Headers :

 - Authourization: token

Response Body (Success):

```
{
    "data": true
}
```

