
/* ════════════════════════════════════════════════════
   GAME LOGIC — mirrors the original JS files exactly
════════════════════════════════════════════════════ */

/* ── Helpers ── */
const $ = id => document.getElementById(id);
const val = id => $(id).value.trim();

/** Clear output div and show new lines with stagger. */
function renderOutput(containerId, lines) {
  const box = $(containerId);
  box.innerHTML = '';
  lines.forEach(([ text, cls ], i) => {
    const div = document.createElement('div');
    div.className = `output-line output-line--${cls}`;
    div.style.animationDelay = `${i * 60}ms`;
    div.textContent = text;
    box.appendChild(div);
  });
}

/* ════════ Q1 — Singleton CEO ════════ */
class CEO {
  constructor(name, age, address) {
    if (CEO.instance) return CEO.instance;
    this.name    = name;
    this.age     = parseInt(age);
    this.address = address;
    CEO.instance = this;
  }
  /** Reset the singleton (for playground re-runs) */
  static reset() { CEO.instance = null; }
}

function runQ1() {
  // Reset so each RUN starts fresh
  CEO.reset();

  const name1 = val('q1-name1'), age1 = val('q1-age1'), addr1 = val('q1-addr1');
  const name2 = val('q1-name2'), age2 = val('q1-age2'), addr2 = val('q1-addr2');

  const ceo1 = new CEO(name1, age1, addr1);
  const ceo2 = new CEO(name2, age2, addr2);
  const same = ceo1 === ceo2;

  renderOutput('q1-output', [
    [`> const ceo1 = new CEO("${name1}", ${age1}, "${addr1}")`, 'cmd'],
    [`CEO { name: "${ceo1.name}", age: ${ceo1.age}, address: "${ceo1.address}" }`, 'match'],
    [``, 'empty'],
    [`> const ceo2 = new CEO("${name2}", ${age2}, "${addr2}")`, 'cmd'],
    [`CEO { name: "${ceo2.name}", age: ${ceo2.age}, address: "${ceo2.address}" }`, 'info'],
    [`⚠ ceo2 values ignored — same instance returned`, 'diff'],
    [``, 'empty'],
    [`> ceo1 === ceo2`, 'cmd'],
    [same ? '✓ true  — Singleton works!' : '✗ false — something went wrong', same ? 'match' : 'diff'],
  ]);
}

/* ════════ Q2 — Factory Vehicles ════════ */
function Car(type, brand, model)        { this.type = type; this.brand = brand; this.model = model; }
function Truck(type, brand, model)      { this.type = type; this.brand = brand; this.model = model; }
function Motorcycle(type, brand, model) { this.type = type; this.brand = brand; this.model = model; }

class VehicleFactory {
  createVehicle(type, brand, model) {
    switch (type.toLowerCase()) {
      case 'car':        return new Car(type, brand, model);
      case 'truck':      return new Truck(type, brand, model);
      case 'motorcycle': return new Motorcycle(type, brand, model);
      default:           throw new Error(`Unknown type: ${type}`);
    }
  }
}

const vehicleFactory = new VehicleFactory();

function runQ2() {
  const type  = val('q2-type');
  const brand = val('q2-brand') || 'Unknown';
  const model = val('q2-model') || 'Unknown';

  try {
    const v = vehicleFactory.createVehicle(type, brand, model);
    const icon = type === 'car' ? '🚗' : type === 'truck' ? '🚛' : '🏍️';
    const ctor = type.charAt(0).toUpperCase() + type.slice(1);

    renderOutput('q2-output', [
      [`> factory.createVehicle("${type}", "${brand}", "${model}")`, 'cmd'],
      [`${icon} ${ctor} {`, 'match'],
      [`   type:  "${v.type}",`, 'info'],
      [`   brand: "${v.brand}",`, 'info'],
      [`   model: "${v.model}"`, 'info'],
      [`}`, 'match'],
      [``, 'empty'],
      [`✓ Created via VehicleFactory — caller never called new ${ctor}() directly`, 'match'],
    ]);
  } catch(e) {
    renderOutput('q2-output', [[ `✗ Error: ${e.message}`, 'diff' ]]);
  }
}

/* ════════ Q3 — Factory Toys ════════ */
function ToyDuck(color, price)       { this.color = color; this.price = parseFloat(price); }
function ToyCar(color, price, name)  { this.color = color; this.price = parseFloat(price); this.name = name; }
function ToyFactory() {}
ToyFactory.prototype.createToy = function(type, color, price, name) {
  switch (type.toLowerCase()) {
    case 'duck': return new ToyDuck(color, price);
    case 'car':  return new ToyCar(color, price, name);
    default:     throw new Error('Invalid toy type');
  }
};

const toyFactory = new ToyFactory();

function toggleToyName() {
  const type = $('q3-type').value;
  $('q3-name-group').style.display = type === 'car' ? 'flex' : 'none';
}

function runQ3() {
  const type  = val('q3-type');
  const color = val('q3-color') || 'yellow';
  const price = val('q3-price') || '0';
  const name  = val('q3-name')  || 'Toy Car';

  try {
    const toy  = toyFactory.createToy(type, color, price, name);
    const icon = type === 'duck' ? '🦆' : '🚗';
    const ctor = type === 'duck' ? 'ToyDuck' : 'ToyCar';
    const lines = [
      [`> toyFactory.createToy("${type}", "${color}", ${price}${type==='car'?`, "${name}"`:''})`,'cmd'],
      [`${icon} ${ctor} {`, 'match'],
      [`   color: "${toy.color}",`, 'info'],
      [`   price: ${toy.price}${toy.name !== undefined ? `,` : ''}`, 'info'],
    ];
    if (toy.name !== undefined) lines.push([`   name:  "${toy.name}"`, 'info']);
    lines.push([`}`, 'match']);
    lines.push([``, 'empty']);
    lines.push([`✓ Prototype-based Factory — ToyFactory.prototype.createToy()`, 'match']);
    renderOutput('q3-output', lines);
  } catch(e) {
    renderOutput('q3-output', [[ `✗ Error: ${e.message}`, 'diff' ]]);
  }
}

/* ════════ Q4 — Singleton ConfigureVals (IIFE) ════════ */
class ConfigureVals {
  constructor(xpoint = 0, ypoint = 0, shape = null) {
    this.xpoint = parseFloat(xpoint) || 0;
    this.ypoint = parseFloat(ypoint) || 0;
    this.shape  = shape || null;
  }
}

// IIFE closure — instance is private, not accessible outside
const getConfiguration = (function() {
  let instance = null;
  return function(xpoint, ypoint, shape) {
    if (!instance) instance = new ConfigureVals(xpoint, ypoint, shape);
    return instance;
  };
})();

// Expose a reset for the playground only
let _configReset = null;
const getConfigurationResettable = (function() {
  let instance = null;
  _configReset = () => { instance = null; };
  return function(xpoint, ypoint, shape) {
    if (!instance) instance = new ConfigureVals(xpoint, ypoint, shape);
    return instance;
  };
})();

function runQ4() {
  _configReset(); // reset for fresh playground run

  const x1 = val('q4-x1'), y1 = val('q4-y1'), s1 = val('q4-s1');
  const x2 = val('q4-x2'), y2 = val('q4-y2'), s2 = val('q4-s2');

  const c1 = getConfigurationResettable(x1, y1, s1);
  const c2 = getConfigurationResettable(x2, y2, s2);
  const same = c1 === c2;

  renderOutput('q4-output', [
    [`> const config1 = getConfiguration(${x1}, ${y1}, "${s1}")`, 'cmd'],
    [`ConfigureVals { xpoint: ${c1.xpoint}, ypoint: ${c1.ypoint}, shape: "${c1.shape}" }`, 'match'],
    [``, 'empty'],
    [`> const config2 = getConfiguration(${x2}, ${y2}, "${s2}")`, 'cmd'],
    [`ConfigureVals { xpoint: ${c2.xpoint}, ypoint: ${c2.ypoint}, shape: "${c2.shape}" }`, 'info'],
    [`⚠ config2 args ignored — instance already exists in closure`, 'diff'],
    [``, 'empty'],
    [`> config1 === config2`, 'cmd'],
    [same ? '✓ true  — Singleton (IIFE) works!' : '✗ false', same ? 'match' : 'diff'],
  ]);
}
