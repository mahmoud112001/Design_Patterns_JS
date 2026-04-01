// Payment
// function processPayment(
//   method,
//   amount,
//   CreditCarNumber,
//   PayPalAccount,
//   PhoneNumber
// ) {
//   if (method == "CreditCard") {
//     console.log(`you choose CreditCard with amount ${amount}$`);
//   } else if (method == "PayPal") {
//     console.log(`you choose PayPal with amount ${amount}$`);
//   } else if (method == "Electronic Wallet") {
//     console.log(`you choose Electronic Wallet with amount ${amount}$`);
//   }
// }

// class Payment{
//     Pay(amount){
//        throw new Error('Payment way can not be detected')
//     }
// }

class PayPal {
  constructor(PayPalAccount) {
    this.PayPalAccount = PayPalAccount;
  }
  Pay(amount) {
    console.log(
      `you choose PayPal account ${this.PayPalAccount} with amount ${amount}$`
    );
  }
}
class CreditCard {
  constructor(CreditCarNumber) {
    this.CreditCarNumber = CreditCarNumber;
  }
  Pay(amount) {
    console.log(
      `you choose CreditCard account ${this.CreditCarNumber} with amount ${amount}$`
    );
  }
}
class ElectronicWallet {
  constructor(PhoneNumber) {
    this.PhoneNumber = PhoneNumber;
  }
  Pay(amount) {
    console.log(
      `you choose Electronic Wallet number ${this.PhoneNumber} with amount ${amount}$`
    );
  }
}
class Crypto {
  constructor(key) {
    this.key = key;
  }
  Pay(amount) {
    console.log(
      `you choose Crypto wallet number ${this.PhoneNumber} with amount ${amount}bitcoin`
    );
  }
}

class PaymentStrategy {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(newStrategy) {
    this.strategy = newStrategy;
  }
  processPayment(amount) {
    // console.log(this.strategy);
    this.strategy.Pay(amount);
  }
}

let payment1 = new PaymentStrategy(new CreditCard(3546254));
payment1.setStrategy(new PayPal("account1"));
payment1.processPayment(1000);
