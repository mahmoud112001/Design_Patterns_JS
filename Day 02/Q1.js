/*
1-Consider that we have A store that sell products 
and  every day the store put new products into
 the store and the store want to let every people
  that interested with store that new product is in the store now.

*/

// Observer (Customer)
class Customer {
  constructor(name) {
    this.name = name;
  }

  update(product) {
    console.log(`${this.name} got notified about new product: ${product}`);
  }
}

// Subject (Store)
class Store {
  constructor() {
    this.customers = [];
  }

  subscribe(customer) {
    this.customers.push(customer);
  }

  unsubscribe(customer) {
    this.customers = this.customers.filter(c => c !== customer);
  }

  notify(product) {
    this.customers.forEach(customer => customer.update(product));
  }

  addProduct(product) {
    console.log(`New product added: ${product}`);
    this.notify(product);
  }
}

// testcase
const store = new Store();

const ahmed = new Customer("Ahmed");
const sara = new Customer("Sara");

store.subscribe(ahmed);
store.subscribe(sara);

store.addProduct("iPhone 15");
store.addProduct("PlayStation 5");