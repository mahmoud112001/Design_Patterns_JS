/* -You have been hired to develop an application
 for a car shop. The owner of the car 
  wants an easy to navigate interface with the ability 
  to document all the types of vehicles that he fixes in his shop. On a daily basis, through his and his employers hands pass around dozen different types of vehicles. You need to find a clean and concise way to insert all those 
   of cars into your database.*/

   // Q2
// 2) Factory Pattern for Vehicles

function Car(type, brand, model) {
  this.type = type;
  this.brand = brand;
  this.model = model;
}

function Truck(type, brand, model) {
  this.type = type;
  this.brand = brand;
  this.model = model;
}

function Motorcycle(type, brand, model) {
  this.type = type;
  this.brand = brand;
  this.model = model;
}

class VehicleFactory {
  createVehicle(type, brand, model) {
    switch (type.toLowerCase()) {
      case "car":
        return new Car(type, brand, model);
      case "truck":
        return new Truck(type, brand, model);
      case "motorcycle":
        return new Motorcycle(type, brand, model);
    }
  }
}

// Test
const vehicleFactory = new VehicleFactory();

const v1 = vehicleFactory.createVehicle("car", "Toyota", "Corolla");
const v2 = vehicleFactory.createVehicle("truck", "Volvo", "FH");
const v3 = vehicleFactory.createVehicle("motorcycle", "Honda", "CBR");

console.log(v1);
console.log(v2);
console.log(v3);