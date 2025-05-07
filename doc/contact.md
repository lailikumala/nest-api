# Contact API

## Create Contact

Enpoint : POST /api/contacts

Headers:
 - Authorization: token

 Request Body 

 ```
    {
        "first_name": "jhon",
        "last_name": "doe",
        "email": "jhondoe@gmail.com",
        "phone": "08975432345"
    }
 ```

 Response Body 

 ```
    {
        "data": {
            "id": 1,
            "first_name": "jhon",
            "last_name": "doe",
            "email": "jhondoe@gmail.com",
            "phone": "08975432345"
        }
    }
 ```

## Get Contact

Enpoint : GET /api/contacts/:contactId

Headers:
 - Authorization: token

 Response Body 

 ```
    {
        "data": {
            "id": 1,
            "first_name": "jhon",
            "last_name": "doe",
            "email": "jhondoe@gmail.com",
            "phone": "08975432345"
        }
    }
 ```

## Update Contact

Enpoint : PUT /api/contacts/:contactId

Headers:
 - Authorization: token

 Request Body 

 ```
    {
        "first_name": "jhon",
        "last_name": "doe",
        "email": "jhondoe@gmail.com",
        "phone": "08975432345"
    }
 ```

 Response Body 

 ```
    {
        "data": {
            "id": 1,
            "first_name": "jhon",
            "last_name": "doe",
            "email": "jhondoe@gmail.com",
            "phone": "08975432345"
        }
    }
 ```

## Remove Contact

Enpoint : DELETE /api/contacts/:contactId

Headers:
 - Authorization: token

 Response Body 

 ```
    {
        "data": true
    }
 ```

## Search Contact

Enpoint : GET /api/contacts

Headers:
 - Authorization: token

Queary Params: 
- name: string, // optional, contact first name or contact last name
- phone: string, // optional, contact phone
- email: string // optional, contact email
- page: number // default 1,
- size: number // default 10

 Response Body 

 ```
    {
        "data": [
            {
            "id": 1,
            "first_name": "jhon",
            "last_name": "doe",
            "email": "jhondoe@gmail.com",
            "phone": "08975432345"
            },
            {
            "id": 2,
            "first_name": "jhon",
            "last_name": "doe",
            "email": "jhondoe@gmail.com",
            "phone": "08975432345"
            }
        ]
        "paging": {
            "current_page": 1,
            "total_page": 10,
            "size": 10
        }
    }
 ```