// Run node to use vending machine :)
// Run node to use vending machine :)
// Run node to use vending machine :)
// Run node to use vending machine :)
// Run node to use vending machine :)

const stock = require('../stock');
class VendingMachine {
  constructor() {
    this.order = [];
    this.status = "What's your order id?";
  }
  renderItems() {
    const items = [];
    stock.forEach((item) => items.push([`id: ${item.id}`, item.name, `£${item.price}`]));
    return items;
  }
  orderItem(id) {
    stock.find((item) => {
      if (item.id == id) this.order.push(item);
    });
    console.log('Item added:', this.order[0].name);
    this.changeStatus('ordered');
    return this.order;
  }
  changeStatus(stage) {
    if (stage === 'ordered') this.status = 'Please select payment method.';
    console.log(this.status);
    return this.status;
  }
  getPrice() {
    return this.order[0].price;
  }
}
const vendingMachine = new VendingMachine();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRemainingPrice(rem) {
  let remainingPay = rem;
  if (remainingPay > 0) {
    rl.question('£2, £1, £0.50, £0.20, £0.10\n', (answer) => {
      if (answer.match(/^.*(£2|£1|£0.50|£0.20|£0.10).*$/)) {
        console.log(answer.slice(1));
        remainingPay -= answer.slice(1);
        if (remainingPay > 0)
          console.log('Remaining amount to pay is: £' + remainingPay.toFixed(2));
        getRemainingPrice(remainingPay);
      } else {
        console.log('Please use accepted coins');
        rl.question('£2, £1, £0.50, £0.20, £0.10\n', (answer) => {
          remainingPay -= answer.slice(1);
          if (remainingPay > 0)
            console.log('Remaining amount to pay is: £' + remainingPay.toFixed(2));
          getRemainingPrice(remainingPay);
        });
      }
    });
  } else {
    console.log('Your change is: £' + remainingPay.toFixed(2) * -1);
    console.log('Thank you for your payment. Please take your item.');
    process.exit();
  }

  return remainingPay.toFixed(2);
}

console.log(vendingMachine.renderItems());
rl.question("What's your order id?\n", (answer) => {
  if (!answer.match(/0[0-1][0-9]/)) {
    console.log('Sorry, incorrect item entered. Please try again.');
    process.exit();
  } else {
    vendingMachine.orderItem(answer);
    console.log('Your total is: £' + vendingMachine.getPrice());
    rl.question('Cash / Card\n', (answer) => {
      if (answer.match(/card/i)) {
        console.log('Please tap your card');
        rl.question('TAP\n', () => {
          console.log('Thank you for your payment. Please take your item.');
          process.exit();
        });
      }
      if (answer.match(/cash/i)) {
        console.log('Your total is: £' + vendingMachine.getPrice());
        console.log('Please insert accepted coins');
        rl.question('£2, £1, £0.50, £0.20, £0.10\n', (answer) => {
          if (answer.match(/^.*(£2|£1|£0.50|£0.20|£0.10).*$/)) {
            if (answer.slice(1) > vendingMachine.getPrice()) {
              console.log(
                'Your change is: £' + (answer.slice(1) - vendingMachine.getPrice()).toFixed(2)
              );
              console.log('Thank you for your payment. Please take your item.');
              process.exit();
            } else {
              // let remainingPay = vendingMachine.getPrice();
              console.log(
                'Remaining amount to pay is: £' +
                  (vendingMachine.getPrice() - answer.slice(1)).toFixed(2)
              );
              getRemainingPrice(vendingMachine.getPrice() - answer.slice(1));
            }
          } else {
            console.log('Please use accepted coins');
            rl.question('£2, £1, £0.50, £0.20, £0.10\n', (answer) => {
              if (answer.slice(1) > vendingMachine.getPrice()) {
                console.log(
                  'Your change is: £' + (answer.slice(1) - vendingMachine.getPrice()).toFixed(2)
                );
                console.log('Thank you for your payment. Please take your item.');
                process.exit();
              } else {
                // let remainingPay = vendingMachine.getPrice();
                console.log('ihere');
                console.log(
                  'Remaining amount to pay is: £' +
                    (vendingMachine.getPrice() - answer.slice(1)).toFixed(2)
                );
                getRemainingPrice(vendingMachine.getPrice() - answer.slice(1));
              }
            });
          }
        });
      }
    });
  }
});

module.exports = { VendingMachine };
