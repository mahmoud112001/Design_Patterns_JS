class Database {
  constructor(name) {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
    this.name = name;
  }
  connect() {
    console.log("Connected To DB");
  }
}

let connection1 = new Database("db1");
let connection2 = new Database("db1");
console.log(connection1 == connection2);
