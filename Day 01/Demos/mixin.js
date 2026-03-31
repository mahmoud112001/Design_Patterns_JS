class Bird {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  description() {
    console.log(` i am ${this.name} with age ${this.age}`);
  }
}

const flying = {
  setFlyState(flyState) {
    this.flyState = flyState;
  },
  fly() {
    if (this.flyState) {
      console.log("I can Fly");
    } else {
      console.log("I can not Fly");
    }
  },
};
Object.assign(Bird.prototype, flying);
let bird1 = new Bird("Egle", 2);
bird1.setFlyState(true)
bird1.fly()
