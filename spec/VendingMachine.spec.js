const { VendingMachine } = require('../src/VendingMachine.js');

describe('VendingMachine', () => {
  let vendingMachine;
  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });
  it('- know the price for each item', () => {
    const expected = [
      ['id: 000', 'Extra Peppermint', '£0.99'],
      ['id: 001', "Dorito's Chilli Heatwave", '£0.49'],
      ['id: 002', "Walker's Ready Salted", '£0.39'],
      ['id: 003', "Ridged Cute Walker's Paprika", '£0.49'],
      ['id: 004', "Sensation's Thai Sweet Chilli", '£0.49'],
      ['id: 005', 'Popcorn Salted', '£2.99'],
      ['id: 006', 'Popcorn Sweet & Salted', '£4.99'],
      ['id: 007', 'Popcorn Toffee', '£3.99'],
      ['id: 009', 'Maltesers', '£0.99'],
      ['id: 010', 'Skittles', '£0.99'],
      ['id: 011', 'Skittles Sour', '£0.99'],
      ['id: 012', 'Snickers', '£0.99'],
      ['id: 013', 'Mars', '£0.99'],
      ['id: 014', "M&M's", '£0.99'],
      ['id: 015', "M&M's Crispy", '£0.99'],
      ['id: 016', "M&M's Peanuts", '£0.99'],
      ['id: 017', 'Fruitella', '£0.99'],
      ['id: 018', 'ROLO', '£0.99'],
      ['id: 019', 'POLO', '£0.99'],
    ];
    const result = vendingMachine.renderItems();
    expect(result).toEqual(expected);
  });
  it('- add item to order', () => {
    const expected = [{ id: '002', price: 0.39, name: "Walker's Ready Salted", inStock: 4 }];
    const result = vendingMachine.orderItem('002');
    expect(result).toEqual(expected);
  });
  it('- provide a status message', () => {
    const expected = 'Please select payment method.';
    vendingMachine.orderItem('002');
    const result = vendingMachine.changeStatus();
    expect(result).toEqual(expected);
  });
  it('- get price', () => {
    const expected = 0.39;
    vendingMachine.orderItem('002');
    const result = vendingMachine.getPrice();
    expect(result).toEqual(expected);
  });
});
