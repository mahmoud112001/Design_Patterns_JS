/* 
4- In this challenge, you have to implement a configuration that uses the singleton pattern. You are given a class ConfigureVals. Define it as follows:

It should have a constructor that defines the properties xpoint, ypoint, and shape.

The constructor should initialize xpoint, ypoint, and shape to 0, 0 ,null if the values for these properties are not passed to t
he constructor.
Make sure that only a single instance of the class can be made by defining the function getConfiguration.
*/

// Q4
// 4) Singleton Pattern for ConfigureVals

class ConfigureVals {
  constructor(xpoint = 0, ypoint = 0, shape = null) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.shape = shape;
  }
}

const getConfiguration = (function () {
  let instance = null;

  return function (xpoint, ypoint, shape) {
    if (!instance) {
      instance = new ConfigureVals(xpoint, ypoint, shape);
    }
    return instance;
  };
})();

// Test
const config1 = getConfiguration(10, 20, "circle");
const config2 = getConfiguration(50, 60, "square");

console.log(config1);
// ConfigureVals { xpoint: 10, ypoint: 20, shape: 'circle' }

console.log(config2);
// Same first object

console.log(config1 === config2); // true
