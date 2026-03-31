// class Coffiee {
//   constructor(
//     suger,
//     orderState,
//     toppings,
//     condition,
//     singleOrDouple,
//     Dark,
//     coffieanPercentage
//   ) {
//     this.suger = suger;
//     this.orderState = orderState;
//     this.toppings = toppings;
//     this.condition = condition;
//     this.singleOrDouple = singleOrDouple;
//     this.Dark = Dark;
//     this.coffieanPercentage = coffieanPercentage;
//   }
// }
class Coffiee {
  constructor(Dark) {
    this.Dark = Dark;
  }
}

// let myCoffiee=new Coffiee(2,'indoor',['vanilla'],'Cold','single',true,'hard')

class CoffieeBuilder {
  constructor(dark) {
    this.coffiee = new Coffiee(dark);
  }
  setSuger(suger) {
    this.coffiee.suger = suger;
    return this;
  }
  setToppings(toppings) {
    this.coffiee.toppings = toppings;
    return this;
  }
  setCondition(condition) {
    this.coffiee.condition = condition;
    return this;
  }
  setOrderState(orderState) {
    this.coffiee.orderState = orderState;
    return this;
  }

  build() {
    return this.coffiee;
  }
}

let coffiee = new CoffieeBuilder("Dark")
  .setCondition("Cold")
  .setSuger(2)
  .setToppings(["Vanila"])
  .build();

  console.log(coffiee);