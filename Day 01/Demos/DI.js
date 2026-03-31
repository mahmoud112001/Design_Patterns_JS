// class Brand{
//     constructor(name){
//         this.name=name
//     }
// }



class Engin {
    constructor(location,power){
        this.location=location
        this.power=power
        // this.brand=brand
    }
}

class Car {
  constructor(speed,engin) {
    this.speed = speed;
    this.engin=engin
    // this.engin = new Engin('USA',1000,new Brand('abc'));
  }
}
// caller obj
// let car1=new Car(2000,new Engin('USA',1000))
