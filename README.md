# 🏗️ JavaScript Design Patterns & SOLID Principles Lab

> A comprehensive interactive learning platform covering SOLID architectural principles and classic JavaScript design patterns with hands-on code examples and visual demonstrations.

---

## 📋 Project Overview

This project is an educational resource exploring **SOLID principles** and **JavaScript design patterns** through:
- ✅ **Interactive browser UI** with live code examples
- ✅ **Online playgrounds** — modify inputs and see real-time results
- ✅ **Visual comparisons** — side-by-side "violated" vs. "applied" code
- ✅ **Detailed explanations** — theory, problems, and improvements for each pattern
- ✅ **Architectural impact charts** — metrics showing principle effectiveness


---

## 👨‍💻 Project Credits


| **Role** | **Details** |
|----------|-----------|
| **Developer** | Mahmoud Awad Saad |
| **Program** | ITI — ICC \| MEARN Track |
| **Instructor** | Amira Abdelhady |
| **Patterns Covered** | Singleton · Factory · Observer · Strategy |
| **Year** | 2026 |

### 🔗 Connect

- **GitHub:** [github.com/mahmoud112001](https://github.com/mahmoud112001)
- **LinkedIn:** [linkedin.com/in/mahmoud-awad-795b02203](https://www.linkedin.com/in/mahmoud-awad-795b02203/)
- **Email:** [mahmoudawad112001@gmail.com](mailto:mahmoudawad112001@gmail.com)


---

## 📁 Directory Structure

```
JS DP/
├── README.md                    # This file
├── index.html                   # SOLID Principles interactive guide
│
├── src/                         # SOLID guide styling & logic
│   ├── script.js               # SOLID principles implementations
│   └── style.css               # Tailwind + custom styles
│
├── Day 01/                      # Design Patterns Lab
│   ├── README.md               # Detailed patterns documentation
│   ├── index.html              # Interactive exercises UI
│   ├── script.js               # Q1–Q4 implementations
│   ├── style.css               # Design Patterns styling
│   ├── Q1.js                   # Singleton Pattern (CEO)
│   ├── Q2.js                   # Factory Pattern (VehicleFactory)
│   ├── Q3.js                   # Factory Pattern (ToyFactory)
│   ├── Q4.js                   # Singleton Pattern (IIFE Closure)
│   │
│   └── Demos/                  # Individual demo files
│       ├── Singleton.js        # Singleton pattern examples
│       ├── Factory.js          # Factory pattern examples
│       ├── builder.js          # Builder pattern examples
│       ├── mixin.js            # Mixin pattern examples
│       └── DI.js               # Dependency Injection examples
│
└── Day 02/                      # Advanced Patterns
    ├── Q1.js                   # Observer Pattern (Store & Customers)
    ├── Q2.js                   # Strategy Pattern (Game Strategies)
    └── Report.md               # Day 02 documentation
```

---

## 🎯 SOLID Principles Guide

### 📍 What Are SOLID Principles?

SOLID is an acronym for five design principles that help create maintainable, scalable, and robust software:

| Letter | Principle | Summary |
|--------|-----------|---------|
| **S** | Single Responsibility | A class should have only one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subtypes must be substitutable for their base types |
| **I** | Interface Segregation | Clients should depend on specific interfaces |
| **D** | Dependency Inversion | Depend on abstractions, not concrete implementations |

### 🚀 Running the SOLID Guide

**Option 1 — Direct**
```bash
# Open index.html in your browser
start index.html
```

**Option 2 — With Local Server** (recommended)
```bash
# Navigate to project root
cd "d:\iti material\vs\JS DP"

# Start a local server
npx serve .
# Visit http://localhost:3000
```

### 🎮 Features

- **Interactive tabs** — switch between "Why It Matters", "The Problem", and "Improvement"
- **Side-by-side code** — click "Violated" vs. "Applied" to compare implementations
- **Impact charts** — visualize the difference in readability, testability, and safety
- **Responsive design** — fully functional on mobile, tablet, and desktop

---

## 🃏 Design Patterns Exercises (Day 01)

A hands-on lab covering four classic design patterns with interactive playgrounds.

### 📖 Patterns Covered

| # | Pattern | Concept |
|---|---------|---------|
| **Q1** | **Singleton** | `CEO` class — ensures only one instance exists across the application |
| **Q2** | **Factory** | `VehicleFactory` — creates different vehicle types without exposing constructors |
| **Q3** | **Factory** | `ToyFactory` — prototype-based factory for creating toy objects |
| **Q4** | **Singleton** | `ConfigureVals` — IIFE closure-based singleton for better encapsulation |

### 📋 Q1: Singleton Pattern (Class-Based)

**Objective:** Ensure only one CEO instance exists.

```javascript
class CEO {
  constructor(name, age, address) {
    if (CEO.instance) return CEO.instance; // Return existing instance
    this.name = name;
    this.age = age;
    this.address = address;
    CEO.instance = this;                    // Store instance on class
  }
}

const ceo1 = new CEO("Ali", 50, "Cairo");
const ceo2 = new CEO("Maya", 35, "Alex");
console.log(ceo1 === ceo2); // true — same object!
```

**Key Insight:** Both calls return the same instance. Second constructor ignores new parameters.

---

### 📋 Q2: Factory Pattern (Class-Based)

**Objective:** Create different vehicles without calling constructors directly.

```javascript
class VehicleFactory {
  createVehicle(type, brand, model) {
    switch (type.toLowerCase()) {
      case "car":
        return new Car(brand, model, "4 wheels");
      case "truck":
        return new Truck(brand, model, "6 wheels");
      case "motorcycle":
        return new Motorcycle(brand, model, "2 wheels");
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}

const factory = new VehicleFactory();
const myCar = factory.createVehicle("car", "Toyota", "Corolla");
```

**Key Insight:** Client code doesn't need to know about Car, Truck, Motorcycle constructors — Factory abstracts the creation logic.

---

### 📋 Q3: Factory Pattern (Prototype-Based)

**Objective:** Create toys (Duck or Car) using prototype-based factory pattern.

```javascript
function ToyDuck(color, price) {
  this.color = color;
  this.price = price;
}

function ToyCar(color, price, name) {
  this.color = color;
  this.price = price;
  this.name = name;
}

ToyFactory.prototype.createToy = function(type, color, price, name) {
  switch (type.toLowerCase()) {
    case "duck":
      return new ToyDuck(color, price);
    case "car":
      return new ToyCar(color, price, name);
    default:
      throw new Error("Invalid toy type");
  }
};
```

**Key Insight:** Demonstrates prototype-based approach to the Factory pattern (older JavaScript style).

---

### 📋 Q4: Singleton Pattern (IIFE Closure)

**Objective:** Create a singleton that hides its instance inside a closure.

```javascript
const getConfiguration = (function() {
  let instance = null; // Private — not accessible from outside
  
  return function(xpoint, ypoint, shape) {
    if (!instance) {
      instance = new ConfigureVals(xpoint, ypoint, shape);
    }
    return instance;
  };
})(); // IIFE executes immediately

const config1 = getConfiguration(10, 20, "circle");
const config2 = getConfiguration(50, 60, "square");
console.log(config1 === config2); // true
```

**Key Insight:** Instance is hidden inside closure — much more encapsulated than Q1's class-based approach. Better for private data.

---

### 🎮 Interactive Playground Features

- **Live input fields** — modify values and re-run examples
- **Animated terminal output** — results appear with typing effect
- **Instant feedback** — see object references and equality checks
- **Insight badges** — highlight key differences and learning points

### 🚀 Running Day 01

```bash
cd "Day 01"
# Open index.html in browser
start index.html

# Or with server:
npx serve .
```

---

## 🎨 Advanced Patterns (Day 02)

Additional pattern exercises exploring Observer and Strategy patterns.

### 📖 Patterns Covered

| # | Pattern | Concept |
|---|---------|---------|
| **Q1** | **Observer** | Store notifies customers about new products |
| **Q2** | **Strategy** | Game changes strategy (attack/defense/medium) |

### 📋 Q1: Observer Pattern

**Objective:** Implement a pub/sub system where a Store notifies multiple Customers.

```javascript
// Observer (Subscriber)
class Customer {
  constructor(name) {
    this.name = name;
  }
  update(product) {
    console.log(`${this.name} got notified: new product is ${product}`);
  }
}

// Subject (Publisher)
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

// Usage
const store = new Store();
const ahmed = new Customer("Ahmed");
const sara = new Customer("Sara");

store.subscribe(ahmed);
store.subscribe(sara);
store.addProduct("iPhone 15");
```

**Key Insight:** Decouples Store from Customers. Customers are notified automatically without tight coupling.

---

### 📋 Q2: Strategy Pattern

**Objective:** Change game strategy at runtime (attack/defense/medium).

```javascript
// Strategies
class AttackStrategy {
  play() {
    console.log("Playing in ATTACK mode ⚽🔥");
  }
}

class DefenseStrategy {
  play() {
    console.log("Playing in DEFENSE mode 🛡️");
  }
}

// Context
class Game {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy; // Switch strategy at runtime
  }

  play() {
    this.strategy.play();
  }
}

// Usage
const game = new Game(new MediumStrategy());
game.play();              // medium

game.setStrategy(new AttackStrategy());
game.play();              // attack

game.setStrategy(new DefenseStrategy());
game.play();              // defense
```

**Key Insight:** Strategy pattern allows runtime algorithm switching without conditional logic.

---

## 🗂️ Demo Files (Day 01/Demos/)

Individual standalone implementations of various patterns:

| File | Pattern | Description |
|------|---------|-------------|
| `Singleton.js` | Singleton | Multiple implementations of singleton pattern |
| `Factory.js` | Factory | Factory method and variations |
| `builder.js` | Builder | Building complex objects step-by-step |
| `mixin.js` | Mixin | Object composition using mixins |
| `DI.js` | Dependency Injection | Injecting dependencies for better testability |

These files can be run independently as learning references.

---

## 🚀 Quick Start Guide

### View SOLID Principles
```bash
# Option 1 — Direct file
start index.html

# Option 2 — Web server
npx serve .
# Visit http://localhost:3000
```

### View Design Patterns (Day 01)
```bash
cd Day 01
start index.html

# Or with server
npx serve .
# Visit http://localhost:3000
```

### Run Individual Pattern Files
```bash
# View source code
code Day 01/Q1.js
code Day 01/Q2.js
code Day 01/Demos/Singleton.js

# Execute in Node.js
node Day 01/Q1.js
node Day 02/Q1.js
```

---

## 📚 Key Concepts

### What is a Design Pattern?

A design pattern is a **reusable solution** to a **common problem** in software design. It's a template for how to solve a problem that can be used in many different situations.

### Why Learn Design Patterns?

1. **Communication** — developers share vocabulary and concepts
2. **Reusability** — solve problems faster using proven solutions
3. **Maintainability** — cleaner, more organized code
4. **Flexibility** — easier to extend and modify
5. **Performance** — patterns often lead to optimized implementations

### Pattern Categories

- **Creational** — object creation (Singleton, Factory, Builder)
- **Structural** — object composition (Mixin, Decorator)
- **Behavioral** — object interaction (Observer, Strategy, Command)

---

## 🎓 Learning Outcomes

After working through this lab, you'll understand:

✅ SOLID principles and how to apply them  
✅ Singleton pattern and its use cases  
✅ Factory pattern variations  
✅ Observer pattern for event-driven systems  
✅ Strategy pattern for algorithm selection  
✅ Code comparison: before and after patterns  
✅ When and how to use each pattern  

---

## 🛠️ Technologies Used

- **HTML5** — semantic structure
- **CSS3** — flexbox, grid, animations, Tailwind CSS
- **JavaScript (ES6+)** — classes, closures, prototypes
- **Chart.js** — SOLID principle impact visualization

---

## 📖 References & Resources

### How to Run Locally

1. **Clone or download** this repository
2. **Navigate** to the project directory
3. **Open `index.html`** in your browser, or
4. **Start a server:**
   ```bash
   cd "d:\iti material\vs\JS DP"
   npx serve .
   ```
5. **Visit** `http://localhost:3000`

### Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

### File Structure Notes

- **No build tools required** — vanilla JavaScript
- **No external dependencies** — uses CDN for Chart.js and Tailwind
- **Self-contained HTML files** — each section is completely independent

---

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and adapt for your own learning
- Add more pattern examples
- Create better visualizations
- Submit improvements

---

## 📝 License & Attribution

**Project:** JavaScript Design Patterns & SOLID Principles Lab  
**Created:** 2026  
**Developer:** Mahmoud Awad Saad  
**Institution:** ITI — ICC | MEARN Track  
**Instructor:** Amira Abdelhady  

All code examples are provided for educational purposes.

---

## 💬 Questions or Feedback?

- **GitHub Issues:** [github.com/mahmoud112001](https://github.com/mahmoud112001)
- **LinkedIn:** [linkedin.com/in/mahmoud-awad-795b02203](https://www.linkedin.com/in/mahmoud-awad-795b02203/)
- **Email:** mahmoudawad112001@gmail.com

---

**Happy Learning! 🚀**
