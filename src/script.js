 
        const solidData = {
            srp: {
                id: 'srp', letter: 'S',
                title: 'Single Responsibility Principle',
                definition: 'A class should have one, and only one, reason to change. Every module or class should have responsibility over a single part of the functionality.',
                theory: {
                    why: "When a class has multiple responsibilities, a change in one may break another. A class with a single purpose is immediately obvious — you know what it does, where to find its code, and where to make changes without side effects.",
                    problem: "A class that handles user authentication, sends email notifications, AND logs activity needs to change every time the email provider changes, the logging format changes, or the auth rules change. Three completely unrelated reasons — any of them can break the others.",
                    improve: "Each class becomes a specialist. Changing how emails are sent only touches EmailService. Your UserService never needs updating for email reasons. Tests become laser-focused and fast. New developers immediately understand each class's single purpose."
                },
                code: {
                    bad: {
                        snippet: `<span class="cmt">// One class doing three different jobs</span>
<span class="kw">class</span> <span class="cls">UserManager</span> {

  <span class="fn">createUser</span>(data) {
    <span class="cmt">// 1. Handles user data logic</span>
    <span class="kw">const</span> user = { id: <span class="cls">Date</span>.<span class="fn">now</span>(), ...data };
    <span class="kw">return</span> user;
  }

  <span class="fn">sendWelcomeEmail</span>(user) {
    <span class="cmt">// 2. Email logic — unrelated to user mgmt</span>
    console.<span class="fn">log</span>(\`Emailing \${user.email}\`);
  }

  <span class="fn">logActivity</span>(action) {
    <span class="cmt">// 3. Logging — also unrelated</span>
    console.<span class="fn">log</span>(\`[LOG] \${action}\`);
  }
}`,
                        explanation: "UserManager has 3 reasons to change: user data logic, email provider changes, and logging format changes. Any of these unrelated concerns forces edits to the same class.",
                        state: 'bad'
                    },
                    good: {
                        snippet: `<span class="cmt">// Each class has ONE reason to change</span>
<span class="kw">class</span> <span class="cls">UserService</span> {
  <span class="fn">createUser</span>(data) {
    <span class="kw">return</span> { id: <span class="cls">Date</span>.<span class="fn">now</span>(), ...data };
  }
}

<span class="kw">class</span> <span class="cls">EmailService</span> {
  <span class="fn">sendWelcome</span>(user) {
    console.<span class="fn">log</span>(\`Emailing \${user.email}\`);
  }
}

<span class="kw">class</span> <span class="cls">Logger</span> {
  <span class="fn">log</span>(action) {
    console.<span class="fn">log</span>(\`[LOG] \${action}\`);
  }
}

<span class="cmt">// Coordinator wires them together</span>
<span class="kw">const</span> user = <span class="kw">new</span> <span class="cls">UserService</span>().<span class="fn">createUser</span>({ email: <span class="str">'a@b.com'</span> });
<span class="kw">new</span> <span class="cls">EmailService</span>().<span class="fn">sendWelcome</span>(user);
<span class="kw">new</span> <span class="cls">Logger</span>().<span class="fn">log</span>(<span class="str">'user_created'</span>);`,
                        explanation: "Three focused classes, each with a single reason to change. Swap the email provider? Only EmailService changes. Nothing else is affected.",
                        state: 'good'
                    }
                },
                chart: { labels: ['Readability', 'Testability', 'Change Safety'], bad: [35, 30, 25], good: [90, 95, 88] }
            },
            ocp: {
                id: 'ocp', letter: 'O',
                title: 'Open / Closed Principle',
                definition: 'Software entities should be open for extension but closed for modification. Add new behaviour without changing existing, tested code.',
                theory: {
                    why: "Modifying working, tested code is risky — every change is a potential bug. OCP encourages designing code so new features are added by writing new code, not editing old code. This keeps existing tests green and existing behaviour stable.",
                    problem: "A function with a long if/else or switch statement that checks the object type is an OCP violation. Every time a new type is added, you go back into that function, add a new branch, and risk breaking all the cases that already worked.",
                    improve: "New shapes, payment types, or export formats are added by creating a new class — existing code never needs to see them. Your test suite for existing behaviour stays untouched. The system becomes a set of interchangeable, composable parts."
                },
                code: {
                    bad: {
                        snippet: `<span class="kw">class</span> <span class="cls">AreaCalculator</span> {
  <span class="fn">calculate</span>(shape) {
    <span class="cmt">// Must edit this every time a new shape is added</span>
    <span class="kw">if</span> (shape.type === <span class="str">'circle'</span>) {
      <span class="kw">return</span> <span class="cls">Math</span>.PI * shape.radius ** <span class="num">2</span>;
    } <span class="kw">else if</span> (shape.type === <span class="str">'rectangle'</span>) {
      <span class="kw">return</span> shape.width * shape.height;
    } <span class="kw">else if</span> (shape.type === <span class="str">'triangle'</span>) {
      <span class="kw">return</span> <span class="num">0.5</span> * shape.base * shape.height;
    }
    <span class="cmt">// Adding 'hexagon' means editing THIS function</span>
  }
}`,
                        explanation: "Every new shape forces a modification to calculate(). This risks breaking existing shapes and requires re-testing the entire function each time.",
                        state: 'bad'
                    },
                    good: {
                        snippet: `<span class="cmt">// Each shape knows how to calculate its own area</span>
<span class="kw">class</span> <span class="cls">Circle</span> {
  <span class="kw">constructor</span>(radius) { <span class="kw">this</span>.radius = radius; }
  <span class="fn">area</span>() { <span class="kw">return</span> <span class="cls">Math</span>.PI * <span class="kw">this</span>.radius ** <span class="num">2</span>; }
}

<span class="kw">class</span> <span class="cls">Rectangle</span> {
  <span class="kw">constructor</span>(w, h) { <span class="kw">this</span>.w = w; <span class="kw">this</span>.h = h; }
  <span class="fn">area</span>() { <span class="kw">return</span> <span class="kw">this</span>.w * <span class="kw">this</span>.h; }
}

<span class="cmt">// Calculator is CLOSED for modification</span>
<span class="kw">class</span> <span class="cls">AreaCalculator</span> {
  <span class="fn">calculate</span>(shape) {
    <span class="kw">return</span> shape.<span class="fn">area</span>(); <span class="cmt">// works for ANY shape</span>
  }
}

<span class="cmt">// New shape = new class only. Existing code untouched.</span>
<span class="kw">class</span> <span class="cls">Hexagon</span> {
  <span class="fn">area</span>() { <span class="kw">return</span> <span class="num">42</span>; }
}`,
                        explanation: "AreaCalculator never changes. Adding Hexagon means writing one new class. Existing Circle and Rectangle tests stay green. Open for extension, closed for modification.",
                        state: 'good'
                    }
                },
                chart: { labels: ['Extensibility', 'Stability', 'Test Safety'], bad: [25, 40, 35], good: [95, 92, 96] }
            },
            lsp: {
                id: 'lsp', letter: 'L',
                title: 'Liskov Substitution Principle',
                definition: 'Subclasses or derived classes must be substitutable for their parent or base classes without altering the correctness of the program.',
                theory: {
                    why: "It ensures that inheritance hierarchies are semantically correct, not just syntactically valid. Code that expects a base class should work flawlessly with any subclass without needing to know the difference.",
                    problem: "Developers often use inheritance for code reuse rather than modelling true 'is-a' relationships. This leads to subclasses that implement methods by throwing exceptions ('Not Implemented') or changing expected behaviours, causing runtime crashes.",
                    improve: "Your code becomes more predictable and robust. You can write generalised functions that operate on abstractions with confidence. It forces you to design better abstractions and guides you away from deep inheritance trees towards composition."
                },
                code: {
                    bad: {
                        snippet: `<span class="kw">class</span> <span class="cls">Bird</span> {
  <span class="fn">fly</span>() { <span class="kw">return</span> <span class="str">"I am flying"</span>; }
}

<span class="kw">class</span> <span class="cls">Eagle</span> <span class="kw">extends</span> <span class="cls">Bird</span> {}

<span class="cmt">// Ostrich IS a Bird — but it can't fly</span>
<span class="kw">class</span> <span class="cls">Ostrich</span> <span class="kw">extends</span> <span class="cls">Bird</span> {
  <span class="fn">fly</span>() {
    <span class="kw">throw new</span> <span class="cls">Error</span>(<span class="str">"Ostriches cannot fly!"</span>);
  }
}

<span class="kw">function</span> <span class="fn">makeBirdFly</span>(bird) {
  <span class="cmt">// Crashes when an Ostrich is passed</span>
  <span class="kw">return</span> bird.<span class="fn">fly</span>();
}`,
                        explanation: "Ostrich changes the expected behaviour of the base class method by throwing an error, breaking the program for any code expecting a generic Bird.",
                        state: 'bad'
                    },
                    good: {
                        snippet: `<span class="kw">class</span> <span class="cls">Bird</span> {
  <span class="cmt">// Only what ALL birds share</span>
}

<span class="kw">class</span> <span class="cls">FlyingBird</span> <span class="kw">extends</span> <span class="cls">Bird</span> {
  <span class="fn">fly</span>() { <span class="kw">return</span> <span class="str">"I am flying"</span>; }
}

<span class="kw">class</span> <span class="cls">Eagle</span> <span class="kw">extends</span> <span class="cls">FlyingBird</span> {}

<span class="cmt">// Ostrich only inherits what it can actually do</span>
<span class="kw">class</span> <span class="cls">Ostrich</span> <span class="kw">extends</span> <span class="cls">Bird</span> {
  <span class="fn">run</span>() { <span class="kw">return</span> <span class="str">"I am running fast"</span>; }
}

<span class="kw">function</span> <span class="fn">makeBirdFly</span>(bird) {
  <span class="cmt">// Specifically asks for a FlyingBird — honest</span>
  <span class="kw">return</span> bird.<span class="fn">fly</span>();
}`,
                        explanation: "We redesign the hierarchy. Functions needing flight specifically ask for a FlyingBird. Ostrich is a Bird but not a FlyingBird. Substitutability is maintained throughout.",
                        state: 'good'
                    }
                },
                chart: { labels: ['Predictability', 'Code Reuse', 'Runtime Safety'], bad: [30, 80, 20], good: [90, 60, 95] }
            },
            isp: {
                id: 'isp', letter: 'I',
                title: 'Interface Segregation Principle',
                definition: 'Clients should not be forced to depend on interfaces they do not use; many specific interfaces are better than one general-purpose interface.',
                theory: {
                    why: "It prevents 'fat' or 'bloated' interfaces that contain methods not relevant to all implementing classes. This reduces unnecessary dependencies and coupling, making your system easier to understand and change.",
                    problem: "When an interface has too many methods, implementing classes are forced to provide dummy implementations for methods they don't need. If the fat interface changes, all implementing classes may need updating — even if the change didn't affect them.",
                    improve: "It leads to highly cohesive, decoupled code. Changes in one specific behaviour only affect classes that actually use that behaviour. In JavaScript (which lacks strict interfaces), this translates to smaller, focused object shapes or mixins."
                },
                code: {
                    bad: {
                        snippet: `<span class="cmt">// A 'fat' interface concept</span>
<span class="kw">class</span> <span class="cls">SmartDevice</span> {
  <span class="fn">print</span>() {}
  <span class="fn">scan</span>()  {}
  <span class="fn">fax</span>()   {}
}

<span class="kw">class</span> <span class="cls">AllInOnePrinter</span> <span class="kw">extends</span> <span class="cls">SmartDevice</span> {
  <span class="fn">print</span>() { <span class="cmt">/* prints */</span> }
  <span class="fn">scan</span>()  { <span class="cmt">/* scans */</span>  }
  <span class="fn">fax</span>()   { <span class="cmt">/* faxes */</span>  }
}

<span class="kw">class</span> <span class="cls">BasicPrinter</span> <span class="kw">extends</span> <span class="cls">SmartDevice</span> {
  <span class="fn">print</span>() { <span class="cmt">/* prints */</span> }
  <span class="fn">scan</span>()  { <span class="kw">throw new</span> <span class="cls">Error</span>(<span class="str">"Cannot scan"</span>); }
  <span class="fn">fax</span>()   { <span class="kw">throw new</span> <span class="cls">Error</span>(<span class="str">"Cannot fax"</span>);  }
}`,
                        explanation: "BasicPrinter is forced to implement scan() and fax() even though it cannot perform those actions, leading to dummy methods and potential runtime errors.",
                        state: 'bad'
                    },
                    good: {
                        snippet: `<span class="cmt">// Segregated behaviours via composition/mixins</span>
<span class="kw">const</span> <span class="fn">printer</span> = (state) => ({
  <span class="fn">print</span>: () => <span class="str">"Printing "</span> + state.name
});

<span class="kw">const</span> <span class="fn">scanner</span> = (state) => ({
  <span class="fn">scan</span>: () => <span class="str">"Scanning "</span> + state.name
});

<span class="cmt">// Basic printer: only print capability</span>
<span class="kw">function</span> <span class="fn">createBasicPrinter</span>(name) {
  <span class="kw">let</span> state = { name };
  <span class="kw">return</span> <span class="cls">Object</span>.<span class="fn">assign</span>({}, <span class="fn">printer</span>(state));
}

<span class="cmt">// Advanced printer: multiple capabilities composed</span>
<span class="kw">function</span> <span class="fn">createAllInOne</span>(name) {
  <span class="kw">let</span> state = { name };
  <span class="kw">return</span> <span class="cls">Object</span>.<span class="fn">assign</span>({}, <span class="fn">printer</span>(state), <span class="fn">scanner</span>(state));
}`,
                        explanation: "Objects are composed only of the specific behaviours they need. No class is forced to carry useless methods. Adding a fax capability only touches classes that need it.",
                        state: 'good'
                    }
                },
                chart: { labels: ['Cohesion', 'Coupling', 'Maintainability'], bad: [30, 90, 40], good: [85, 20, 90] }
            },
            dip: {
                id: 'dip', letter: 'D',
                title: 'Dependency Inversion Principle',
                definition: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details.',
                theory: {
                    why: "It protects your core business logic from changes in infrastructure or third-party libraries. When high-level modules depend on abstractions, swapping a database, payment provider, or logger becomes trivial.",
                    problem: "When a high-level module instantiates a low-level module directly with 'new', they are tightly coupled. To change the database, add a mock for testing, or switch payment providers, you must modify the core business logic.",
                    improve: "Testability improves dramatically — inject a mock object instead of the real database. Flexibility increases — swap a MySQL implementation for MongoDB without touching business logic. The system becomes modular and 'wired up' at the composition root."
                },
                code: {
                    bad: {
                        snippet: `<span class="kw">class</span> <span class="cls">StripeAPI</span> {
  <span class="fn">chargeCard</span>(amount) {
    <span class="cmt">// Complex Stripe-specific logic</span>
    <span class="kw">return true</span>;
  }
}

<span class="kw">class</span> <span class="cls">StoreCheckout</span> {
  <span class="kw">constructor</span>() {
    <span class="cmt">// High-level depends directly on low-level</span>
    <span class="kw">this</span>.processor = <span class="kw">new</span> <span class="cls">StripeAPI</span>();
  }

  <span class="fn">purchase</span>(item) {
    <span class="kw">this</span>.processor.<span class="fn">chargeCard</span>(item.price);
  }
}`,
                        explanation: "StoreCheckout is tightly coupled to StripeAPI. Switching to PayPal or mocking the payment during unit tests requires rewriting the StoreCheckout class.",
                        state: 'bad'
                    },
                    good: {
                        snippet: `<span class="cmt">// Low-level: concrete implementation</span>
<span class="kw">class</span> <span class="cls">StripeAPI</span> {
  <span class="fn">processPayment</span>(amount) { <span class="cmt">/* Stripe logic */</span> }
}

<span class="cmt">// High-level: depends on an abstraction</span>
<span class="kw">class</span> <span class="cls">StoreCheckout</span> {
  <span class="kw">constructor</span>(paymentProcessor) {
    <span class="kw">this</span>.processor = paymentProcessor; <span class="cmt">// injected</span>
  }

  <span class="fn">purchase</span>(item) {
    <span class="kw">this</span>.processor.<span class="fn">processPayment</span>(item.price);
  }
}

<span class="cmt">// "Wiring" — done outside both classes</span>
<span class="kw">const</span> store = <span class="kw">new</span> <span class="cls">StoreCheckout</span>(<span class="kw">new</span> <span class="cls">StripeAPI</span>());

<span class="cmt">// For tests — pass a mock instead</span>
<span class="kw">const</span> mock = { <span class="fn">processPayment</span>: () => <span class="str">"mocked"</span> };
<span class="kw">const</span> testStore = <span class="kw">new</span> <span class="cls">StoreCheckout</span>(mock);`,
                        explanation: "StoreCheckout expects ANY object with a processPayment method. Inject Stripe in production, inject a mock in tests. The business logic never changes.",
                        state: 'good'
                    }
                },
                chart: { labels: ['Testability', 'Modularity', 'Coupling'], bad: [20, 30, 95], good: [95, 90, 15] }
            }
        };

        let currentState = { principle: 'srp', tab: 'why', codeState: 'bad' };
        let currentChart = null;

        const navList      = document.getElementById('nav-list');
        const titleEl      = document.getElementById('principle-title');
        const letterEl     = document.getElementById('principle-letter');
        const defEl        = document.getElementById('principle-definition');
        const tabBtns      = document.querySelectorAll('.tab-btn');
        const tabContent   = document.getElementById('tab-content');
        const codeDisplay  = document.getElementById('code-display');
        const btnBad       = document.getElementById('btn-bad-code');
        const btnGood      = document.getElementById('btn-good-code');
        const codeExp      = document.getElementById('code-explanation');
        const mobileBtn    = document.getElementById('mobile-menu-btn');
        const closeBtn     = document.getElementById('close-menu-btn');
        const sidebar      = document.getElementById('sidebar');

        function init() {
            renderNav();
            updateView();
            setupEventListeners();
        }

        function renderNav() {
            navList.innerHTML = '';
            Object.values(solidData).forEach(p => {
                const li  = document.createElement('li');
                const btn = document.createElement('button');
                const isActive = p.id === currentState.principle;
                btn.className = `w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${isActive ? 'bg-stone-800 text-teal-400 border border-stone-700 shadow-inner' : 'hover:bg-stone-800 hover:text-white text-stone-400'}`;
                btn.innerHTML = `<span class="flex items-center justify-center w-8 h-8 rounded ${isActive ? 'bg-teal-900/50' : 'bg-stone-800'} font-bold text-sm">${p.letter}</span><span>${p.id.toUpperCase()}</span>`;
                btn.onclick = () => {
                    currentState.principle = p.id;
                    currentState.codeState = 'bad';
                    currentState.tab = 'why';
                    if (window.innerWidth < 768) toggleMobileMenu();
                    renderNav();
                    updateView();
                };
                li.appendChild(btn);
                navList.appendChild(li);
            });
        }

        function updateView() {
            const data = solidData[currentState.principle];
            titleEl.textContent = data.title;
            letterEl.textContent = data.letter;
            defEl.textContent = data.definition;
            updateTabs();
            updateCode();
            renderChart(data.chart);
        }

        function updateTabs() {
            const data = solidData[currentState.principle].theory;
            tabBtns.forEach(btn => {
                const active = btn.dataset.target === currentState.tab;
                btn.classList.toggle('text-teal-700', active);
                btn.classList.toggle('border-teal-500', active);
                btn.classList.toggle('bg-white', active);
                btn.classList.toggle('text-stone-500', !active);
            });
            tabContent.style.opacity = 0;
            tabContent.innerHTML = `<p>${data[currentState.tab]}</p>`;
            setTimeout(() => { tabContent.style.opacity = 1; tabContent.style.transition = 'opacity 0.3s ease'; }, 10);
        }

        function updateCode() {
            const data = solidData[currentState.principle].code[currentState.codeState];
            const bad = currentState.codeState === 'bad';
            btnBad.className = bad
                ? 'px-4 py-1.5 text-xs font-medium rounded-md bg-stone-700 text-rose-400 shadow-sm transition-all'
                : 'px-4 py-1.5 text-xs font-medium rounded-md text-stone-500 hover:text-stone-300 transition-all';
            btnGood.className = bad
                ? 'px-4 py-1.5 text-xs font-medium rounded-md text-stone-500 hover:text-stone-300 transition-all'
                : 'px-4 py-1.5 text-xs font-medium rounded-md bg-stone-700 text-emerald-400 shadow-sm transition-all';
            codeExp.className = `absolute top-4 right-4 w-64 md:max-w-xs backdrop-blur-md text-xs p-3 rounded shadow-lg transition-colors duration-300 leading-relaxed ${bad ? 'bg-rose-950/90 border border-rose-800/50 text-rose-200' : 'bg-emerald-950/90 border border-emerald-800/50 text-emerald-200'}`;
            codeDisplay.innerHTML = data.snippet;
            codeExp.innerHTML = `<strong>Note:</strong> ${data.explanation}`;
            codeDisplay.parentElement.scrollTop = 0;
        }

        function renderChart(chartData) {
            const ctx = document.getElementById('impactChart').getContext('2d');
            if (currentChart) currentChart.destroy();
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        { label: 'Standard Implementation', data: chartData.bad,  backgroundColor: 'rgba(244,63,94,0.2)',   borderColor: 'rgba(244,63,94,0.8)',   borderWidth: 1, borderRadius: 4 },
                        { label: 'SOLID Applied',           data: chartData.good, backgroundColor: 'rgba(16,185,129,0.2)',  borderColor: 'rgba(16,185,129,0.8)',  borderWidth: 1, borderRadius: 4 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#57534e', font: { size: 11 } } },
                        tooltip: { backgroundColor: 'rgba(28,25,23,0.9)', padding: 10, cornerRadius: 6 }
                    },
                    scales: {
                        y: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: '#e7e5e4' } },
                        x: { ticks: { color: '#57534e', font: { size: 11 } }, grid: { display: false } }
                    },
                    animation: { duration: 750, easing: 'easeOutQuart' }
                }
            });
        }

        function toggleMobileMenu() {
            sidebar.classList.toggle('hidden');
            if (!sidebar.classList.contains('hidden')) sidebar.classList.add('absolute','top-0','left-0','h-full');
        }

        function setupEventListeners() {
            tabBtns.forEach(btn => btn.addEventListener('click', e => { currentState.tab = e.target.dataset.target; updateTabs(); }));
            btnBad.addEventListener('click',  () => { if (currentState.codeState !== 'bad')  { currentState.codeState = 'bad';  updateCode(); } });
            btnGood.addEventListener('click', () => { if (currentState.codeState !== 'good') { currentState.codeState = 'good'; updateCode(); } });
            mobileBtn.addEventListener('click', toggleMobileMenu);
            closeBtn.addEventListener('click',  toggleMobileMenu);
        }

        document.addEventListener('DOMContentLoaded', init);
    