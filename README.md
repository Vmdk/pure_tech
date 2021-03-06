# pure_tech
test task

### Deployed URL

https://secret-basin-22489.herokuapp.com/ 

### Usage

There is only one API: `/order`. You should send `POST` request with
header `Content-Type: application/json` and body of next structure:
```
{
    "products": [
        {
            "productId": "milk",
            "amount": 6
        },
        {
            "productId": "apple",
            "amount": 3
        }
    ],
    "date": "24/04/2020"
}
```
Available `productIds` (due to requirements) are: `soup, milk, apple, bread`.
Expected response should have status `200` and body like:
```
{
    "subtotal": "$10.80",
    "discounts": [
        "Apples 10% off: -30p"
    ],
    "total": "$10.50"
}
```
Available discounts (due to requirements) are:
```
● Apples have 10% off their normal price this week
● Buy 2 tins of soup and get a loaf of bread for half price
```

### Notes

1. If you provide wrong input - program would act like you provide empty
products list and current date. So, by design, there shouldn't be 'error'-like responses.
2. If you use Postman, here is general snippet of request :
```
POST /order HTTP/1.1
Host: secret-basin-22489.herokuapp.com
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: <...>

{
    "products": [
        {
            "productId": "soup",
            "amount": 4
        },
        {
            "productId": "bread",
            "amount": 3
        }
    ],
    "date": "24/04/2020"
}
```
