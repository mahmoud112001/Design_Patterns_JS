# 🧩 Design Patterns Lab — Interactive Web UI

> A polished interactive browser UI that visualises four JavaScript Design Patterns exercises — replacing `console.log` output with a live terminal playground.

**Author:** Mahmoud Awad Saad | **Program:** ITI — ICC | MEARN Track | **Year:** 2026

---

## 🔗 Links

| | |
|---|---|
| **GitHub** | [github.com/mahmoud112001](https://github.com/mahmoud112001) |
| **LinkedIn** | [linkedin.com/in/mahmoud-awad-795b02203](https://www.linkedin.com/in/mahmoud-awad-795b02203/) |
| **Email** | mahmoudawad112001@gmail.com |

---

## 🚀 How to Run

No build tools needed. Just open the file:

```bash
# Option 1 — open directly
open index.html

# Option 2 — with a local server (recommended)
npx serve .
# then visit http://localhost:3000
```

---

## 🃏 Questions Covered

| # | Pattern | Description |
|---|---|---|
| Q1 | **Singleton** | `CEO` class — only one instance allowed. Second `new CEO()` returns the first. |
| Q2 | **Factory** | `VehicleFactory` — creates Car, Truck, or Motorcycle without exposing constructors. |
| Q3 | **Factory** | `ToyFactory` — prototype-based factory creating ToyDuck or ToyCar objects. |
| Q4 | **Singleton** | `ConfigureVals` via IIFE closure — instance hidden inside closure, more encapsulated than Q1. |

---

## 🎮 UI Features

- **Live input fields** — change values and re-run each question
- **Animated terminal output** — lines appear with stagger animation
- **Syntax-highlighted code panel** — each question shows its original code
- **Insight badges** — explain WHY the pattern works for each question
- **Sound toggle** placeholder for future sound effects
- **Fully responsive** — works on mobile, tablet, desktop

---

## 🏗️ Architecture

```
index.html          ← Single self-contained file
├── CSS (inline)    ← Design system with CSS variables
│   ├── tokens      ← colors, fonts, spacing, radii
│   ├── layout      ← grid, panels, card structure
│   ├── components  ← buttons, inputs, terminal, insights
│   └── animations  ← gridMove, blobDrift, fadeDown, lineAppear
└── JS (inline)     ← All four pattern implementations
    ├── CEO         ← Q1 Singleton (class-based)
    ├── VehicleFactory ← Q2 Factory
    ├── ToyFactory  ← Q3 Factory (prototype-based)
    └── getConfiguration ← Q4 Singleton (IIFE closure)
```

---

## 🧠 Design Patterns Summary

### Singleton Pattern (Q1 & Q4)
> Ensures a class has **only one instance** and provides a global access point to it.

**Q1** stores the instance on the class itself (`CEO.instance`).
**Q4** hides the instance inside an **IIFE closure** — more encapsulated, instance is not accessible from outside.

```js
// Q1 — instance on class
class CEO {
  constructor(name, age, address) {
    if (CEO.instance) return CEO.instance;
    CEO.instance = this;
  }
}

// Q4 — instance in IIFE closure
const getConfiguration = (function() {
  let instance = null;           // private — not accessible outside
  return function(x, y, shape) {
    if (!instance) instance = new ConfigureVals(x, y, shape);
    return instance;
  };
})();
```

### Factory Pattern (Q2 & Q3)
> Defines an interface for creating objects, but lets subclasses/methods decide which class to instantiate.

```js
// Q2 — class-based Factory
class VehicleFactory {
  createVehicle(type, brand, model) {
    switch (type) {
      case 'car':   return new Car(type, brand, model);
      case 'truck': return new Truck(type, brand, model);
      // ...
    }
  }
}

// Q3 — prototype-based Factory
ToyFactory.prototype.createToy = function(type, color, price, name) {
  switch (type) {
    case 'duck': return new ToyDuck(color, price);
    case 'car':  return new ToyCar(color, price, name);
  }
};
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#07080d` |
| Surface | `#0e1018` |
| Cyan accent | `#00e5ff` |
| Green accent | `#00ff88` |
| Yellow accent | `#ffe066` |
| Font (code) | `Fira Code` |
| Font (heading) | `Syne` |
| Font (body) | `DM Sans` |

---

*Design Patterns Lab · JavaScript · ITI ICC Program · Inctructor: Amira Abdelhady · MEARN Track · 2026*
*Built by Mahmoud Awad Saad*
