# SOLID Principles — L · I · D
### A Developer's Report on the Last Three SOLID Principles

> **Author:** Mahmoud Awad Saad
> **Program:** ITI — ICC | Full-Stack MEARN Track
> **Year:** 2026

---

## Table of Contents

| # | Principle | Short Definition |
|---|---|---|
| [1](#L) | **L — Liskov Substitution** | Subclasses must be safely substitutable for their parent class |
| [2](#I) | **I — Interface Segregation** | Many small interfaces beat one large general-purpose interface |
| [3](#D) | **D — Dependency Inversion** | Depend on abstractions, not on concrete implementations |

---

<a name="L"></a>
---

# L — Liskov Substitution Principle (LSP)

> *"Objects of a subclass should be replaceable with objects of the superclass without breaking the program."*
> — Barbara Liskov, 1987

![LSP Diagram](https://miro.medium.com/v2/resize:fit:720/format:webp/1*yKk2XKJaCLNlDxQMx1r55A.png)

---

## ❓ Why Is It Important to Know?

<details>
<summary>Click to expand</summary>

Without LSP, **inheritance becomes a trap**.
You extend a class thinking you're reusing code, but the subclass silently breaks the behaviour the rest of your system expects.
Violations lead to:
- Unexpected `throw` statements inside methods
- `if (obj instanceof SubClass)` checks scattered everywhere
- Tests passing on the base class but failing on the child

Knowing LSP tells you **when NOT to use inheritance**, and when to prefer interfaces or composition instead.

</details>

---

## 🐛 What Problem Does It Solve?

**The classic violation — the Penguin problem:**

```
Bird
 ├── Sparrow  ✅ can fly()
 └── Penguin  ❌ throws Error on fly()
```

If `Penguin` extends `Bird` but `fly()` throws an error, then any code that works with a `Bird` **breaks the moment you pass it a Penguin**.
That is an LSP violation — the subclass is NOT substitutable for the parent.

---

## ✅ How Does It Improve Your Code?

| Before LSP | After LSP |
|---|---|
| Subclasses override methods just to throw errors | Every subclass honours the parent's contract |
| Scattered `instanceof` checks | Polymorphism works cleanly |
| Hard to test with mocks | Any implementation can replace another safely |
| Fragile inheritance chains | Stable, predictable hierarchy |

When LSP holds, you can **swap implementations freely** — in tests, in production, in feature flags — without touching any calling code.

---

## 💡 JavaScript Example

### ❌ Violates LSP

```js
// Base class — defines the "contract"
class Bird {
  fly() {
    return "I am flying!";
  }
}

// Penguin IS a bird — but it can't fly
class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly!"); // ← VIOLATION
  }
}

// Function that works with ANY Bird
function makeBirdFly(bird) {
  return bird.fly(); // ← Crashes when bird is a Penguin
}

const sparrow = new Bird();
const penguin = new Penguin();

console.log(makeBirdFly(sparrow)); // ✅ "I am flying!"
console.log(makeBirdFly(penguin)); // ❌ Error: Penguins cannot fly!
```

**The problem:** `Penguin` cannot safely replace `Bird`. LSP is broken.

---

### ✅ Follows LSP

```js
// Separate the "can fly" behaviour into its own class
class Bird {
  // Base birds only have what ALL birds share
  breathe() {
    return "breathing...";
  }
}

class FlyingBird extends Bird {
  fly() {
    return "I am flying!";
  }
}

class Sparrow extends FlyingBird {
  fly() {
    return "Sparrow flying fast!";
  }
}

class Penguin extends Bird {
  // Penguin is still a Bird — it just doesn't extend FlyingBird
  swim() {
    return "Penguin swimming!";
  }
}

// This function ONLY works with FlyingBirds — honest contract
function makeBirdFly(bird) {
  return bird.fly();
}

const sparrow = new Sparrow();
const penguin = new Penguin();

console.log(makeBirdFly(sparrow)); // ✅ "Sparrow flying fast!"
// penguin is never passed to makeBirdFly — the type system prevents it
console.log(penguin.swim());       // ✅ "Penguin swimming!"
```

**Now every subclass can replace its parent safely.** No crashes, no surprises.

---

## 📝 Notes

> 💡 **Rule of thumb:** If a subclass needs to override a method just to throw an error or do nothing, that is a sign you have an LSP violation. Prefer **interfaces and composition** over deep inheritance chains.

- LSP does NOT mean "don't override methods" — it means **override without breaking the expected behaviour**
- LSP violations often hide behind `try/catch` blocks or `instanceof` checks — those are red flags
- In JavaScript (no formal interfaces), enforce LSP through clear documentation, tests, and careful inheritance design
- LSP is closely related to **OCP** — if LSP holds, extending a class (OCP) is always safe

---
---

<a name="I"></a>

# I — Interface Segregation Principle (ISP)

> *"Clients should not be forced to depend on methods they do not use."*
> — Robert C. Martin

![ISP Diagram](https://www.oodesign.com/images/design_principles/interface-segregation-principle-class-diagram.png)

---

## ❓ Why Is It Important to Know?

<details>
<summary>Click to expand</summary>

A fat interface is a maintenance burden.
Every time you add a method to a large interface, **every single class that implements it must be updated** — even if it has nothing to do with the new method.

Knowing ISP teaches you to:
- Design **cohesive, minimal interfaces**
- Avoid coupling unrelated behaviours together
- Make your classes **easier to test** (mock only what you need)

</details>

---

## 🐛 What Problem Does It Solve?

**The fat interface problem:**

```
IWorker  (one big interface)
  ├── work()
  ├── eat()
  └── sleep()

Robot implements IWorker
  → work()   ✅ makes sense
  → eat()    ❌ robots don't eat
  → sleep()  ❌ robots don't sleep
```

`Robot` is forced to implement `eat()` and `sleep()` even though they make no sense for it.
Any change to `eat()` forces a recompile/review of `Robot` — for no reason.

---

## ✅ How Does It Improve Your Code?

| Before ISP | After ISP |
|---|---|
| One giant interface with 10 methods | Multiple small, focused interfaces |
| Classes implement empty/useless methods | Every method a class implements is meaningful |
| Change in one method ripples everywhere | Changes are isolated to the relevant interface |
| Hard to mock in tests | Easy to mock just the methods you need |
| Confusing what a class "is" | Clear, readable intent |

---

## 💡 JavaScript Example

### ❌ Violates ISP

```js
// One fat "interface" (simulated with a base class in JS)
class Worker {
  work()  { throw new Error("Must implement work()");  }
  eat()   { throw new Error("Must implement eat()");   }
  sleep() { throw new Error("Must implement sleep()"); }
}

// HumanWorker — OK, humans do all three
class HumanWorker extends Worker {
  work()  { return "Human working..."; }
  eat()   { return "Human eating...";  }
  sleep() { return "Human sleeping..."; }
}

// RobotWorker — forced to implement methods it doesn't need
class RobotWorker extends Worker {
  work()  { return "Robot working..."; }
  eat()   { return "N/A — robots don't eat"; } // ← forced, meaningless
  sleep() { return "N/A — robots don't sleep"; } // ← forced, meaningless
}
```

**The problem:** `RobotWorker` is polluted with methods it cannot meaningfully implement.

---

### ✅ Follows ISP

```js
// Split into focused, minimal "interfaces" (base classes in JS)

class Workable {
  work() { throw new Error("Must implement work()"); }
}

class Eatable {
  eat() { throw new Error("Must implement eat()"); }
}

class Sleepable {
  sleep() { throw new Error("Must implement sleep()"); }
}

// HumanWorker uses all three — compose via mixins
class HumanWorker {
  work()  { return "Human working..."; }
  eat()   { return "Human eating..."; }
  sleep() { return "Human sleeping..."; }
}

// RobotWorker only takes what it needs
class RobotWorker {
  work() { return "Robot working efficiently!"; }
  // No eat(), no sleep() — clean, honest, focused
}

// --------------------------------------------------
// Usage
// --------------------------------------------------
const human = new HumanWorker();
const robot = new RobotWorker();

console.log(human.work());  // ✅ "Human working..."
console.log(human.eat());   // ✅ "Human eating..."
console.log(robot.work());  // ✅ "Robot working efficiently!"
// robot.eat()              // ✅ Property doesn't exist — no silent garbage
```

---

## 📝 Notes

> 💡 **Rule of thumb:** If a class implements a method just to write `return null` or `throw new Error("Not supported")`, that is an ISP violation.

- JavaScript has no formal `interface` keyword — simulate ISP with **small base classes**, **duck typing**, or **composition**
- ISP is the interface-level version of the **Single Responsibility Principle** — both say "keep things focused"
- ISP violations are common in **large service classes** that grow over time — watch for methods that only some callers use
- In TypeScript, ISP is enforced with small, composable `interface` definitions

---
---

<a name="D"></a>

# D — Dependency Inversion Principle (DIP)

> *"High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions."*
> — Robert C. Martin

![DIP Diagram](https://i.ytimg.com/vi/qrcFGNHivpQ/maxresdefault.jpg)

---

## ❓ Why Is It Important to Know?

<details>
<summary>Click to expand</summary>

When high-level business logic directly imports and uses low-level concrete classes (like `MySQLDatabase`, `EmailService`, `FileLogger`), **your application becomes fragile and hard to test**.

- You can't unit-test the business logic without setting up the real database
- Switching from MySQL to MongoDB means rewriting business logic
- Adding a new notification method (SMS, push) breaks existing classes

DIP solves this by saying: **program to an abstraction, not a concrete class**. Your business logic should not know or care whether the database is MySQL, MongoDB, or an in-memory mock.

</details>

---

## 🐛 What Problem Does It Solve?

**Tight coupling between layers:**

```
OrderService (high-level)
    ↓  directly uses  ↓
MySQLDatabase (low-level)
```

`OrderService` is now **locked to MySQL forever**.
To test `OrderService`, you need a real MySQL connection.
To switch to MongoDB, you rewrite `OrderService`.

**DIP solution:**

```
OrderService (high-level)
    ↓  depends on  ↓
«interface» IDatabase (abstraction)
    ↑  implemented by  ↑
MySQLDatabase / MongoDatabase / MockDatabase
```

---

## ✅ How Does It Improve Your Code?

| Before DIP | After DIP |
|---|---|
| Business logic tied to a specific DB driver | Business logic works with any storage engine |
| Unit tests require real infrastructure | Tests use lightweight mocks/fakes |
| Switching a dependency means rewriting callers | Swap the implementation, callers stay untouched |
| Hard to add new integrations | New integration = new class implementing the interface |
| Tightly coupled modules | Loosely coupled, independently deployable |

---

## 💡 JavaScript Example

### ❌ Violates DIP

```js
// Low-level module — concrete implementation
class MySQLDatabase {
  save(data) {
    return `Saving "${data}" to MySQL database`;
  }
}

// High-level module — directly depends on the concrete class
class OrderService {
  constructor() {
    // ❌ OrderService CREATES and OWNS its dependency
    this.db = new MySQLDatabase();
  }

  placeOrder(item) {
    return this.db.save(item);
  }
}

const service = new OrderService();
console.log(service.placeOrder("Laptop"));
// "Saving "Laptop" to MySQL database"

// Problem: To test OrderService you need a real MySQL connection.
// Problem: To switch to MongoDB you must rewrite OrderService.
```

---

### ✅ Follows DIP

```js
// ── Abstraction (the "interface" both sides depend on) ─────────────

class Database {
  save(data) {
    throw new Error("save() must be implemented");
  }
}

// ── Low-level modules (concrete implementations) ───────────────────

class MySQLDatabase extends Database {
  save(data) {
    return `[MySQL]   Saving "${data}"`;
  }
}

class MongoDatabase extends Database {
  save(data) {
    return `[MongoDB] Saving "${data}"`;
  }
}

// For tests — a simple in-memory fake
class MockDatabase extends Database {
  constructor() {
    super();
    this.records = [];
  }
  save(data) {
    this.records.push(data);
    return `[Mock]    Saved "${data}" in memory`;
  }
}

// ── High-level module ──────────────────────────────────────────────

class OrderService {
  // ✅ Dependency is INJECTED — OrderService doesn't know the concrete type
  constructor(database) {
    this.db = database;
  }

  placeOrder(item) {
    return this.db.save(item);
  }
}

// ── Usage ──────────────────────────────────────────────────────────

const mysqlService = new OrderService(new MySQLDatabase());
console.log(mysqlService.placeOrder("Laptop"));
// ✅ [MySQL]   Saving "Laptop"

const mongoService = new OrderService(new MongoDatabase());
console.log(mongoService.placeOrder("Phone"));
// ✅ [MongoDB] Saving "Phone"

// Testing — no real database needed
const testService = new OrderService(new MockDatabase());
console.log(testService.placeOrder("Tablet"));
// ✅ [Mock]    Saved "Tablet" in memory

// OrderService never changed — only the injected dependency changed ✅
```

---

## 📝 Notes

> 💡 **Rule of thumb:** If you see `new ConcreteClass()` inside a high-level business class, ask yourself — could this ever need to change? If yes, inject it instead.

- DIP is implemented through **Dependency Injection (DI)** — passing dependencies in via constructor, method, or property
- In large applications, a **DI container/framework** manages the injection automatically
- DIP enables the **Open-Closed Principle** — because when dependencies are injected, you extend by adding new implementations, not modifying callers
- In JavaScript/TypeScript, DIP is the foundation of **testable, mockable** architecture
- Common DIP patterns: **Constructor Injection** (most common) · **Method Injection** · **Property Injection**

---
---

## 🗂 Quick Reference — L, I, D at a Glance

| Principle | Core Question | Violation Signal | Fix |
|---|---|---|---|
| **LSP** | Can I replace parent with child safely? | Child throws errors for inherited methods | Restructure inheritance · Use composition |
| **ISP** | Does every method in this interface make sense for every implementer? | Empty or error-throwing method implementations | Split into smaller focused interfaces |
| **DIP** | Does my high-level code `new` a concrete class? | `this.db = new MySQL()` inside business logic | Inject the dependency from outside |

---

## 🔗 How They Connect to Each Other

```
       LSP  ←───────────────────────────────→  ISP
        │                                        │
        │  Both ensure that abstractions         │
        │  can be safely and cleanly swapped     │
        ↓                                        ↓
                         DIP
               Uses the abstractions that
               LSP and ISP make trustworthy
```

- **LSP** ensures that subclasses can be safely used as their parent — DIP needs this to inject any implementation
- **ISP** ensures interfaces are small and specific — DIP depends on those interfaces to decouple modules
- **DIP** brings L and I together — it inverts the dependency direction and relies on solid abstractions (LSP) with clean contracts (ISP)

---

## 📚 Resources

| # | Title | Source | Accessed |
|---|---|---|---|
| 1 | [The Dependency Inversion Principle](https://courses.cs.duke.edu/compsci308/spring26/readings/dip.pdf) | Duke University — CS308 | March 29, 2026 |
| 2 | [SOLID Principles for Object-Oriented Design](https://people.engr.tamu.edu/choe/choe/courses/12summer/315/lectures/slide23.pdf) | Texas A&M University — ENGR | March 29, 2026 |
| 3 | [SOLID Design Principles — Overview with Examples (C#, Python, JS, Java)](https://github.com/jeftegoes/SolidDesignPrinciplesOverviewAndExamples) | GitHub — jeftegoes | March 29, 2026 |
| 4 | [SOLID Design Principles: Hands-On Examples](https://www.splunk.com/en_us/blog/learn/solid-design-principle.html) | Splunk Blog | March 29, 2026 |
| 5 | [SOLID Design Principles Explained: Building Better Software Architecture](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) | DigitalOcean | March 29, 2026 |

---

*SOLID Principles Report — L · I · D · ITI ICC Program · MEARN Track · 2026*
*Mahmoud Awad Saad*