/*You have asked to develop an application for a company X.
The company has only one chief executive officer (CEO) . The
application store been some information a bout the CEO like: name,
age and address. You need to find a clean and concise
implementation of the CEO class in the application .*/

// Q1 answer
// 1) Singleton Pattern for CEO

class CEO {
  constructor(name, age, address) {
    if (CEO.instance) {
      return CEO.instance;
    }

    this.name = name;
    this.age = age;
    this.address = address;

    CEO.instance = this;
  }
}

// Test
const ceo1 = new CEO("Mahmoud", 25, "Alexandria");
const ceo2 = new CEO("Ahmed", 30, "Cairo");

console.log(ceo1);
// CEO { name: 'Mahmoud', age: 25, address: 'Alexandria' }

console.log(ceo2);
// Same object as ceo1

console.log(ceo1 === ceo2); // true
