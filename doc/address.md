# Address API Spec

## Create Address

Enpoint: POST /api/contacts/:contactId/addresses

Headers: 
- Authorization: token

Request Body : 

```
{
    "street": "tebet", // optional
    "city": "jkt", // optional
    "province": "jkt", // optional
    "country": "indonesia",
    "postal_code": "10221"
}
```

Response Body : 

```
{
    "data": {
        "id": 1,
        "street": "tebet", // optional
        "city": "jkt", // optional
        "province": "jkt", // optional
        "country": "indonesia",
        "postal_code": "10221"
    }
}
```

## Get Address

Enpoint: POST /api/contacts/:contactId/addresse/:addressId

Headers: 
- Authorization: token

Response Body : 

```
{
    "data": {
        "id": 1,
        "street": "tebet", // optional
        "city": "jkt", // optional
        "province": "jkt", // optional
        "country": "indonesia",
        "postal_code": "10221"
    }
}
```

## Update Address

Enpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers: 
- Authorization: token

Request Body : 

```
{
    "street": "tebet", // optional
    "city": "jkt", // optional
    "province": "jkt", // optional
    "country": "indonesia",
    "postal_code": "10221"
}
```

Response Body : 

```
{
    "data": {
        "id": 1,
        "street": "tebet", // optional
        "city": "jkt", // optional
        "province": "jkt", // optional
        "country": "indonesia",
        "postal_code": "10221"
    }
}
```

## Remove Address

Enpoint: DELETE /api/contacts/:contactId/addresses/:addressId

Headers: 
- Authorization: token

Response Body : 

```
{
    "data": true
}
```

 ## List Address

 Enpoint: GET /api/contacts/:contactId/addresses

Headers: 
- Authorization: token

Response Body : 

```
{
    "data": [
        {
            "id": 1,
            "street": "tebet", // optional
            "city": "jkt", // optional
            "province": "jkt", // optional
            "country": "indonesia",
            "postal_code": "10221"
        },
        {
            "id": 2,
            "street": "tebet", // optional
            "city": "jkt", // optional
            "province": "jkt", // optional
            "country": "indonesia",
            "postal_code": "10221"
        }
    ]
}
```