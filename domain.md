stock ([
{
id:
price:
name:
inStock:
}
])

Class VendingMachine
PROPERTIES:
order ([])
status (String: Initially "What's your order id?"),

METHODS:
renderItems() => list of all items available,
orderItem(id) => add item to order,
changeStatus(stage) => change status depending on stage of order,
getPrice() => price of order,
