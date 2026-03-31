/*
3- In this problem, you need to implement a factory ToyFactory that can create a toy duck and a toy car object using either the ToyDuck or ToyCar function constructor.

	A ToyDuck object should have the following properties:
	color
	price
	A ToyCar object should have the following properties:
	colors
	price
	name
*/

// Q3
// 3) Factory Pattern using Function Constructors

function ToyDuck(color, price) {
  this.color = color;
  this.price = price;
}

function ToyCar(color, price, name) {
  this.color = color;
  this.price = price;
  this.name = name;
}

function ToyFactory() {}

ToyFactory.prototype.createToy = function (type, color, price, name) {
  switch (type.toLowerCase()) {
    case "duck":
      return new ToyDuck(color, price);

    case "car":
      return new ToyCar(color, price, name);

    default:
      throw new Error("Invalid toy type");
  }
};

// Test
const toyFactory = new ToyFactory();

const duck = toyFactory.createToy("duck", "yellow", 50);
const car = toyFactory.createToy("car", "red", 100, "Racing Car");

console.log(duck); // ToyDuck { color: 'yellow', price: 50 }
console.log(car); // ToyCar { color: 'red', price: 100, name: 'Racing Car' }
