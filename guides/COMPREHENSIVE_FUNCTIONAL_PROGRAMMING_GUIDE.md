# Comprehensive Functional Programming Guide for JavaScript/Node.js

**A Production-Ready Reference for Modern JavaScript Development**

*Research compiled: October 2025 | Based on 2024-2025 industry standards*

---

## Table of Contents

1. [Core FP Principles](#1-core-fp-principles)
2. [Advanced FP Patterns](#2-advanced-fp-patterns)
3. [Practical Libraries](#3-practical-libraries)
4. [Error Handling](#4-error-handling)
5. [State Management](#5-state-management)
6. [Data Transformations](#6-data-transformations)
7. [FP Architecture](#7-fp-architecture)
8. [Testing FP Code](#8-testing-fp-code)
9. [Performance Considerations](#9-performance-considerations)
10. [Real-World Examples](#10-real-world-examples)
11. [Migration Strategy](#11-migration-strategy)
12. [Best Practices & Anti-Patterns](#12-best-practices--anti-patterns)

---

## 1. Core FP Principles

### 1.1 Pure Functions

**Definition**: A pure function always returns the same output for the same inputs and has no side effects.

**Benefits**:
- Predictable and testable
- Can be memoized for performance
- Safe for concurrent execution
- Easy to reason about

**Example**:

```javascript
// IMPURE - depends on external state
let tax = 0.08;
const calculateTotal = (price) => price + (price * tax);

// PURE - all dependencies passed as parameters
const calculateTotal = (price, taxRate) => price + (price * taxRate);

// IMPURE - modifies external state
const items = [];
const addItem = (item) => {
  items.push(item); // Mutation!
  return items;
};

// PURE - returns new array without mutation
const addItem = (items, item) => [...items, item];
```

**Best Practices**:
- Avoid accessing global variables
- Don't modify input parameters
- Don't perform I/O operations
- Don't use Date.now(), Math.random(), or other non-deterministic functions

**When to Break Purity**:
- Database operations (use dedicated layer)
- API calls (wrap in async functions)
- Logging (use dependency injection)
- DOM manipulation (isolate in view layer)

---

### 1.2 Immutability

**Definition**: Data structures that cannot be changed after creation.

**Why It Matters**:
- Prevents unexpected mutations
- Enables time-travel debugging
- Simplifies change detection
- Reduces bugs in concurrent code

**Techniques**:

```javascript
// Object Immutability
const user = { name: 'Alice', age: 30 };

// BAD - Mutation
user.age = 31;

// GOOD - Create new object
const updatedUser = { ...user, age: 31 };

// GOOD - Object.freeze (shallow)
const frozenUser = Object.freeze(user);
// frozenUser.age = 31; // TypeError in strict mode

// Deep freeze utility
const deepFreeze = (obj) => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null
        && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function')
        && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
};

// Array Immutability
const numbers = [1, 2, 3, 4, 5];

// BAD - Mutation
numbers.push(6);
numbers[0] = 0;

// GOOD - Immutable operations
const withSix = [...numbers, 6];
const withZero = [0, ...numbers.slice(1)];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

// Update nested structures immutably
const state = {
  user: {
    profile: {
      email: 'old@example.com'
    }
  }
};

// BAD
state.user.profile.email = 'new@example.com';

// GOOD
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      email: 'new@example.com'
    }
  }
};
```

**Immutable Helpers**:

```javascript
// Update object property
const assoc = (prop, value, obj) => ({
  ...obj,
  [prop]: value
});

// Update nested path
const assocPath = (path, value, obj) => {
  if (path.length === 0) return value;
  const [head, ...tail] = path;
  return assoc(head, assocPath(tail, value, obj[head] || {}), obj);
};

// Usage
const user = { name: 'Alice', address: { city: 'NYC' } };
const updated = assocPath(['address', 'city'], 'LA', user);
// { name: 'Alice', address: { city: 'LA' } }
```

---

### 1.3 Function Composition

**Definition**: Combining simple functions to build more complex ones.

**Why It Matters**:
- Creates reusable building blocks
- Improves code readability
- Enables point-free style
- Promotes single responsibility

**Compose vs Pipe**:

```javascript
// Compose - right to left (mathematical)
const compose = (...fns) => x =>
  fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe - left to right (unix-style)
const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x);

// Example functions
const trim = str => str.trim();
const lowercase = str => str.toLowerCase();
const words = str => str.split(' ');
const first = arr => arr[0];

// Compose: reads bottom-up
const getFirstWord = compose(
  first,
  words,
  lowercase,
  trim
);

// Pipe: reads left-to-right (more intuitive)
const getFirstWord = pipe(
  trim,
  lowercase,
  words,
  first
);

getFirstWord('  Hello World  '); // 'hello'
```

**Real-World Example**:

```javascript
// Data processing pipeline
const processUserData = pipe(
  validateInput,
  normalizeData,
  enrichWithDefaults,
  sanitizeHtml,
  formatOutput
);

// Each function is simple and testable
const validateInput = data => {
  if (!data.email) throw new Error('Email required');
  return data;
};

const normalizeData = data => ({
  ...data,
  email: data.email.toLowerCase().trim()
});

const enrichWithDefaults = data => ({
  role: 'user',
  active: true,
  ...data
});

const sanitizeHtml = data => ({
  ...data,
  bio: escapeHtml(data.bio || '')
});

const formatOutput = data => ({
  ...data,
  createdAt: new Date().toISOString()
});

// Usage
try {
  const result = processUserData({
    email: '  USER@EXAMPLE.COM  ',
    bio: '<script>alert("xss")</script>'
  });
  console.log(result);
} catch (error) {
  console.error(error.message);
}
```

---

### 1.4 Higher-Order Functions

**Definition**: Functions that take functions as arguments or return functions.

**Common Patterns**:

```javascript
// 1. Functions that take functions (map, filter, reduce)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);

// 2. Functions that return functions (factory functions)
const multiplier = factor => num => num * factor;
const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15

// 3. Function decorators
const withLogging = fn => (...args) => {
  console.log(`Calling ${fn.name} with`, args);
  const result = fn(...args);
  console.log(`Result:`, result);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs: Calling add with [2, 3], Result: 5

// 4. Memoization decorator
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const fibonacci = memoize(n => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(100); // Fast with memoization
```

**Practical Higher-Order Functions**:

```javascript
// Retry logic
const retry = (fn, maxAttempts = 3, delay = 1000) => async (...args) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn(...args);
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const fetchData = retry(async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
}, 3, 2000);

// Rate limiting
const rateLimit = (fn, maxCalls, windowMs) => {
  const calls = [];
  return (...args) => {
    const now = Date.now();
    const recentCalls = calls.filter(time => now - time < windowMs);
    if (recentCalls.length >= maxCalls) {
      throw new Error('Rate limit exceeded');
    }
    calls.push(now);
    return fn(...args);
  };
};

const apiCall = rateLimit(fetchFromAPI, 100, 60000); // 100 calls per minute
```

---

### 1.5 Referential Transparency

**Definition**: An expression can be replaced with its value without changing program behavior.

**Benefits**:
- Enables equational reasoning
- Safe for compiler optimizations
- Simplifies testing
- Allows parallel execution

```javascript
// Referentially transparent
const add = (a, b) => a + b;
const x = add(2, 3);
const y = add(2, 3);
// x and y are guaranteed to be equal

// Not referentially transparent
let counter = 0;
const increment = () => ++counter;
const x = increment(); // 1
const y = increment(); // 2
// x and y are different!

// Making it referentially transparent
const increment = (counter) => counter + 1;
const x = increment(0); // 1
const y = increment(0); // 1
// Now x and y are the same
```

---

## 2. Advanced FP Patterns

### 2.1 Currying

**Definition**: Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

**Benefits**:
- Enables partial application
- Creates specialized functions easily
- Facilitates point-free style
- Improves function reusability

**Manual Currying**:

```javascript
// Normal function
const add = (a, b, c) => a + b + c;

// Manually curried
const addCurried = a => b => c => a + b + c;

// Usage
addCurried(1)(2)(3); // 6

// Partial application
const add1 = addCurried(1);
const add1And2 = add1(2);
add1And2(3); // 6
```

**Generic Curry Function**:

```javascript
const curry = (fn) => {
  const arity = fn.length;

  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
};

// Usage
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);      // 6
curriedAdd(1, 2)(3);      // 6
curriedAdd(1)(2, 3);      // 6
curriedAdd(1, 2, 3);      // 6

// Practical example
const replace = curry((find, replacement, str) =>
  str.replace(find, replacement)
);

const replaceSpaces = replace(/\s+/g);
const dasherize = replaceSpaces('-');
const underscoreize = replaceSpaces('_');

dasherize('hello world');      // 'hello-world'
underscoreize('hello world');  // 'hello_world'
```

**Real-World Use Cases**:

```javascript
// Configuration builders
const createLogger = curry((level, timestamp, message) => ({
  level,
  timestamp,
  message
}));

const infoLogger = createLogger('INFO');
const errorLogger = createLogger('ERROR');

const logNow = infoLogger(new Date().toISOString());
logNow('Server started'); // { level: 'INFO', timestamp: '...', message: 'Server started' }

// Data filtering
const filter = curry((predicate, arr) => arr.filter(predicate));
const greaterThan = curry((threshold, value) => value > threshold);

const filterGreaterThan10 = filter(greaterThan(10));
filterGreaterThan10([5, 15, 3, 20]); // [15, 20]

// Event handlers
const on = curry((event, handler, element) =>
  element.addEventListener(event, handler)
);

const onClick = on('click');
const onClickLog = onClick(() => console.log('Clicked!'));

// Apply to multiple elements
document.querySelectorAll('button').forEach(onClickLog);
```

---

### 2.2 Partial Application

**Definition**: Fixing a number of arguments to a function, producing another function with fewer arguments.

**Difference from Currying**:
- Currying: Always returns single-argument functions
- Partial Application: Can fix any number of arguments

```javascript
// Partial application utility
const partial = (fn, ...fixedArgs) =>
  (...remainingArgs) => fn(...fixedArgs, ...remainingArgs);

// Example
const greet = (greeting, name) => `${greeting}, ${name}!`;
const sayHello = partial(greet, 'Hello');

sayHello('Alice'); // 'Hello, Alice!'
sayHello('Bob');   // 'Hello, Bob!'

// Right-partial application
const partialRight = (fn, ...fixedArgs) =>
  (...remainingArgs) => fn(...remainingArgs, ...fixedArgs);

const greetFormal = partialRight(greet, 'Dr. Smith');
greetFormal('Good morning'); // 'Good morning, Dr. Smith!'

// Practical example: API client
const request = (method, url, headers, body) =>
  fetch(url, { method, headers, body });

const postRequest = partial(request, 'POST');
const postWithAuth = partial(postRequest, 'https://api.example.com', {
  'Authorization': 'Bearer token123',
  'Content-Type': 'application/json'
});

postWithAuth(JSON.stringify({ data: 'value' }));
```

---

### 2.3 Point-Free Style

**Definition**: Writing functions without explicitly mentioning their arguments.

**Benefits**:
- More concise code
- Focus on function composition
- Less noise from parameter names
- Encourages small, single-purpose functions

**Examples**:

```javascript
// Point-ful (explicit arguments)
const getUserNames = users => users.map(user => user.name);

// Point-free (no explicit arguments)
const prop = key => obj => obj[key];
const map = fn => arr => arr.map(fn);
const getUserNames = map(prop('name'));

// More examples
// Point-ful
const filterEvens = numbers => numbers.filter(n => n % 2 === 0);
const sumAll = numbers => numbers.reduce((acc, n) => acc + n, 0);

// Point-free
const filter = pred => arr => arr.filter(pred);
const reduce = (fn, init) => arr => arr.reduce(fn, init);
const isEven = n => n % 2 === 0;
const add = (a, b) => a + b;

const filterEvens = filter(isEven);
const sumAll = reduce(add, 0);

// Composition becomes elegant
const sumOfEvens = pipe(
  filter(isEven),
  reduce(add, 0)
);

sumOfEvens([1, 2, 3, 4, 5, 6]); // 12
```

**When to Avoid Point-Free**:

```javascript
// Too clever - hard to understand
const x = pipe(f, g, h, i, j, k); // What does this do?

// Better - clear intent
const processUserData = pipe(
  validateEmail,
  normalizeInput,
  enrichWithDefaults,
  sanitizeHtml,
  saveToDatabase,
  sendWelcomeEmail
);

// Don't force it - this is harder to read
const getUserId = compose(prop('id'), prop('user'));

// This is clearer
const getUserId = data => data.user.id;
```

---

### 2.4 Functors

**Definition**: Objects that implement a `map` method, allowing you to apply a function to values inside a container without changing the container structure.

**Laws**:
1. Identity: `F.map(x => x) ≡ F`
2. Composition: `F.map(x => f(g(x))) ≡ F.map(g).map(f)`

**Implementation**:

```javascript
// Box functor (simple container)
class Box {
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return new Box(fn(this._value));
  }

  fold(fn) {
    return fn(this._value);
  }

  inspect() {
    return `Box(${this._value})`;
  }
}

// Usage
const result = Box(2)
  .map(x => x + 1)      // Box(3)
  .map(x => x * 2)      // Box(6)
  .fold(x => x);        // 6

// Practical example: data processing
const nextCharForNumberString = str => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

// Refactored with Box
const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c);

nextCharForNumberString('  64 '); // 'A'
```

**Real-World Functor: Array**:

```javascript
// Array is a functor
const numbers = [1, 2, 3, 4, 5];

numbers
  .map(x => x * 2)        // [2, 4, 6, 8, 10]
  .map(x => x + 1)        // [3, 5, 7, 9, 11]
  .map(x => `num: ${x}`); // ['num: 3', 'num: 5', ...]
```

---

### 2.5 Monads

**Definition**: Functors that also implement `flatMap` (also called `chain` or `bind`), allowing you to sequence operations that return wrapped values.

**Laws**:
1. Left Identity: `M(a).chain(f) ≡ f(a)`
2. Right Identity: `m.chain(M) ≡ m`
3. Associativity: `m.chain(f).chain(g) ≡ m.chain(x => f(x).chain(g))`

**Why Monads**:
- Handle nested contexts elegantly
- Sequence computations that may fail
- Manage side effects functionally
- Avoid "pyramid of doom"

---

#### 2.5.1 Maybe Monad

**Purpose**: Handle nullable values without null checks.

```javascript
class Maybe {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  static nothing() {
    return new Maybe(null);
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }

  map(fn) {
    return this.isNothing() ? Maybe.nothing() : Maybe.of(fn(this._value));
  }

  flatMap(fn) {
    return this.isNothing() ? Maybe.nothing() : fn(this._value);
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this._value;
  }

  filter(predicate) {
    if (this.isNothing()) return this;
    return predicate(this._value) ? this : Maybe.nothing();
  }

  inspect() {
    return this.isNothing() ? 'Nothing' : `Just(${this._value})`;
  }
}

// Usage
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St'
  }
};

// Without Maybe - brittle
const getStreetName = user => {
  if (user && user.address && user.address.street) {
    return user.address.street.toUpperCase();
  }
  return 'No street';
};

// With Maybe - elegant
const getStreetName = user =>
  Maybe.of(user)
    .flatMap(u => Maybe.of(u.address))
    .flatMap(a => Maybe.of(a.street))
    .map(s => s.toUpperCase())
    .getOrElse('No street');

getStreetName(user);           // '123 MAIN ST'
getStreetName({});             // 'No street'
getStreetName(null);           // 'No street'
```

**Real-World Example**:

```javascript
// Safe property access
const prop = key => obj =>
  Maybe.of(obj)
    .flatMap(o => Maybe.of(o[key]));

const getConfigValue = (config, path) =>
  path.reduce(
    (acc, key) => acc.flatMap(prop(key)),
    Maybe.of(config)
  );

const config = {
  database: {
    postgres: {
      host: 'localhost',
      port: 5432
    }
  }
};

getConfigValue(config, ['database', 'postgres', 'host'])
  .getOrElse('default-host'); // 'localhost'

getConfigValue(config, ['database', 'mysql', 'host'])
  .getOrElse('default-host'); // 'default-host'
```

---

#### 2.5.2 Either Monad

**Purpose**: Handle computations that may fail, carrying error information.

```javascript
class Either {
  constructor(value) {
    this._value = value;
  }

  static left(value) {
    return new Left(value);
  }

  static right(value) {
    return new Right(value);
  }

  static of(value) {
    return Either.right(value);
  }

  static tryCatch(fn) {
    try {
      return Either.right(fn());
    } catch (error) {
      return Either.left(error);
    }
  }
}

class Left extends Either {
  map(fn) {
    return this;
  }

  flatMap(fn) {
    return this;
  }

  fold(leftFn, rightFn) {
    return leftFn(this._value);
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  inspect() {
    return `Left(${this._value})`;
  }
}

class Right extends Either {
  map(fn) {
    return Either.right(fn(this._value));
  }

  flatMap(fn) {
    return fn(this._value);
  }

  fold(leftFn, rightFn) {
    return rightFn(this._value);
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  inspect() {
    return `Right(${this._value})`;
  }
}

// Usage
const validateEmail = email =>
  email.includes('@')
    ? Either.right(email)
    : Either.left('Invalid email');

const validateAge = age =>
  age >= 18
    ? Either.right(age)
    : Either.left('Must be 18 or older');

const validateUser = (email, age) =>
  validateEmail(email)
    .flatMap(() => validateAge(age))
    .map(() => ({ email, age }));

validateUser('alice@example.com', 25)
  .fold(
    error => console.error('Validation failed:', error),
    user => console.log('Valid user:', user)
  );
// Valid user: { email: 'alice@example.com', age: 25 }

validateUser('invalid', 25)
  .fold(
    error => console.error('Validation failed:', error),
    user => console.log('Valid user:', user)
  );
// Validation failed: Invalid email
```

**Railway Oriented Programming with Either**:

```javascript
// Each step returns Either<Error, Value>
const parseJSON = str =>
  Either.tryCatch(() => JSON.parse(str))
    .mapLeft(error => `JSON parse error: ${error.message}`);

const validateSchema = data =>
  data.name && data.age
    ? Either.right(data)
    : Either.left('Missing required fields');

const enrichData = data =>
  Either.right({
    ...data,
    createdAt: new Date().toISOString()
  });

const saveToDatabase = data =>
  Either.tryCatch(() => db.save(data))
    .mapLeft(error => `Database error: ${error.message}`);

// Compose the pipeline
const processRequest = str =>
  parseJSON(str)
    .flatMap(validateSchema)
    .flatMap(enrichData)
    .flatMap(saveToDatabase);

// Usage
processRequest('{"name":"Alice","age":30}')
  .fold(
    error => ({ success: false, error }),
    result => ({ success: true, data: result })
  );
```

---

#### 2.5.3 Task/Promise Monad

**Purpose**: Handle asynchronous computations functionally.

```javascript
class Task {
  constructor(fork) {
    this.fork = fork;
  }

  static of(value) {
    return new Task((reject, resolve) => resolve(value));
  }

  static rejected(error) {
    return new Task((reject, resolve) => reject(error));
  }

  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, value => resolve(fn(value)))
    );
  }

  flatMap(fn) {
    return new Task((reject, resolve) =>
      this.fork(
        reject,
        value => fn(value).fork(reject, resolve)
      )
    );
  }

  fold(errorFn, successFn) {
    return new Task((reject, resolve) =>
      this.fork(
        error => resolve(errorFn(error)),
        value => resolve(successFn(value))
      )
    );
  }
}

// Usage with async operations
const fetchUser = userId =>
  new Task((reject, resolve) => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  });

const fetchPosts = user =>
  new Task((reject, resolve) => {
    fetch(`/api/posts?userId=${user.id}`)
      .then(res => res.json())
      .then(posts => resolve({ ...user, posts }))
      .catch(reject);
  });

// Compose async operations
const getUserWithPosts = userId =>
  fetchUser(userId)
    .flatMap(fetchPosts)
    .map(data => ({
      ...data,
      postsCount: data.posts.length
    }));

// Execute
getUserWithPosts(123).fork(
  error => console.error('Failed:', error),
  data => console.log('Success:', data)
);
```

**Note**: In modern JavaScript, `async/await` often provides a more ergonomic solution for async operations, but Task monad offers better composition and error handling patterns.

---

## 3. Practical Libraries

### 3.1 Ramda

**Philosophy**:
- Automatic currying of all functions
- Data last, function first parameter order
- Pure functions only
- Emphasis on function composition

**Installation**:
```bash
npm install ramda
```

**Core Functions**:

```javascript
import * as R from 'ramda';

// Composition
const { pipe, compose, curry } = R;

// All Ramda functions are auto-curried
const add = R.add;
const add5 = add(5);
add5(3); // 8

// Data transformation
const users = [
  { name: 'Alice', age: 30, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Charlie', age: 35, active: true }
];

// Get names of active users
const getActiveUserNames = R.pipe(
  R.filter(R.prop('active')),
  R.map(R.prop('name'))
);

getActiveUserNames(users); // ['Alice', 'Charlie']

// Path and lens operations
const user = {
  name: 'Alice',
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

R.path(['address', 'city'], user); // 'NYC'
R.pathOr('Unknown', ['address', 'country'], user); // 'Unknown'

// Immutable updates with lenses
const cityLens = R.lensPath(['address', 'city']);
const updatedUser = R.set(cityLens, 'LA', user);
// { name: 'Alice', address: { city: 'LA', zip: '10001' } }

// Over - transform value at lens
const upperCityUser = R.over(cityLens, R.toUpper, user);
// { name: 'Alice', address: { city: 'NYC', zip: '10001' } }
```

**Advanced Patterns**:

```javascript
// Transducers - efficient data pipeline
const isEven = x => x % 2 === 0;
const double = x => x * 2;

const xf = R.compose(
  R.filter(isEven),
  R.map(double)
);

R.transduce(xf, R.flip(R.append), [], [1, 2, 3, 4, 5, 6]);
// [4, 8, 12] - only one pass through array

// Converge - apply multiple functions to same input
const average = R.converge(R.divide, [R.sum, R.length]);
average([1, 2, 3, 4, 5]); // 3

// ApplySpec - create objects from functions
const getPersonData = R.applySpec({
  name: R.prop('name'),
  age: R.prop('age'),
  isAdult: R.pipe(R.prop('age'), R.gte(R.__, 18)),
  summary: R.converge(
    (name, age) => `${name} is ${age} years old`,
    [R.prop('name'), R.prop('age')]
  )
});

getPersonData({ name: 'Alice', age: 30 });
// { name: 'Alice', age: 30, isAdult: true, summary: 'Alice is 30 years old' }

// Conditional logic
const when = R.when;
const ifElse = R.ifElse;

const processValue = R.cond([
  [R.is(Number), R.multiply(2)],
  [R.is(String), R.toUpper],
  [R.T, R.identity]
]);

processValue(5);        // 10
processValue('hello');  // 'HELLO'
processValue(true);     // true
```

**Best Practices**:

```javascript
// Use pipe/compose for clarity
const processOrders = R.pipe(
  R.filter(order => order.status === 'pending'),
  R.groupBy(R.prop('customerId')),
  R.map(R.map(R.prop('total'))),
  R.map(R.sum)
);

// Avoid deeply nested point-free code
// BAD - hard to understand
const x = R.pipe(R.map(R.prop('x')), R.filter(R.gt(R.__, 5)), R.sum);

// GOOD - clear intent
const sumOfXGreaterThan5 = R.pipe(
  R.map(R.prop('x')),
  R.filter(value => value > 5),
  R.sum
);

// Use placeholder for partial application
const divide = R.divide;
const half = divide(R.__, 2);
half(10); // 5

// Named functions for debugging
const isActive = R.prop('active');
const getName = R.prop('name');
const getActiveNames = R.pipe(R.filter(isActive), R.map(getName));
```

---

### 3.2 Lodash/fp

**Philosophy**:
- Curried versions of lodash functions
- Immutable by default
- Function-first, data-last parameter order
- Smaller bundle size when tree-shaken

**Installation**:
```bash
npm install lodash-es
# or
npm install lodash/fp
```

**Usage**:

```javascript
import fp from 'lodash/fp';
// or
import { map, filter, flow } from 'lodash/fp';

// All functions are curried
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const getNames = fp.map('name');
getNames(users); // ['Alice', 'Bob', 'Charlie']

// Flow (like pipe)
const processUsers = fp.flow(
  fp.filter({ active: true }),
  fp.map('name'),
  fp.take(5)
);

// Immutable operations
const original = { a: 1, b: 2 };
const updated = fp.set('a', 10, original);
// original: { a: 1, b: 2 }
// updated: { a: 10, b: 2 }

// Path operations
const data = { user: { profile: { email: 'alice@example.com' } } };
fp.get('user.profile.email', data); // 'alice@example.com'

// Update nested
const updatedData = fp.set('user.profile.email', 'new@example.com', data);
```

**Comparison with Regular Lodash**:

```javascript
import _ from 'lodash';
import fp from 'lodash/fp';

const users = [{ name: 'Alice', age: 30 }];

// Regular lodash - data first
_.map(users, user => user.name);
_.filter(users, { active: true });

// Lodash/fp - function first (curried)
fp.map(user => user.name)(users);
fp.filter({ active: true })(users);

// Regular lodash - not curried, must use partial
const getNames = _.partial(_.map, _, user => user.name);

// Lodash/fp - auto-curried
const getNames = fp.map(user => user.name);
```

**When to Use Lodash/fp**:
- Already using lodash in your project
- Need specific utility functions (debounce, throttle, etc.)
- Want gradual migration to FP style
- Performance is critical (lodash is highly optimized)

---

### 3.3 fp-ts (TypeScript)

**Philosophy**:
- Typed functional programming in TypeScript
- Port of popular FP abstractions from Scala/Haskell
- Strong emphasis on type safety
- Comprehensive collection of FP utilities

**Installation**:
```bash
npm install fp-ts
```

**Core Concepts**:

```typescript
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

// Option - handle nullable values
const findUser = (id: number): O.Option<User> => {
  const user = users.find(u => u.id === id);
  return user ? O.some(user) : O.none;
};

const userName = pipe(
  findUser(123),
  O.map(user => user.name),
  O.getOrElse(() => 'Unknown')
);

// Either - error handling
const validateAge = (age: number): E.Either<string, number> =>
  age >= 18
    ? E.right(age)
    : E.left('Must be 18 or older');

const parseNumber = (str: string): E.Either<string, number> =>
  E.tryCatch(
    () => {
      const num = parseInt(str);
      if (isNaN(num)) throw new Error('Not a number');
      return num;
    },
    (error) => String(error)
  );

const validateAgeFromString = (str: string): E.Either<string, number> =>
  pipe(
    parseNumber(str),
    E.flatMap(validateAge)
  );

// TaskEither - async operations with error handling
const fetchUser = (id: number): TE.TaskEither<Error, User> =>
  TE.tryCatch(
    () => fetch(`/api/users/${id}`).then(res => res.json()),
    (error) => error as Error
  );

const getUserEmail = (id: number): TE.TaskEither<Error, string> =>
  pipe(
    fetchUser(id),
    TE.map(user => user.email)
  );

// Execute
getUserEmail(123)().then(result =>
  pipe(
    result,
    E.fold(
      error => console.error('Error:', error),
      email => console.log('Email:', email)
    )
  )
);
```

**Real-World Example**:

```typescript
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe, flow } from 'fp-ts/function';

// Type-safe API client
interface ValidationError {
  type: 'ValidationError';
  message: string;
}

interface NetworkError {
  type: 'NetworkError';
  message: string;
}

type ApiError = ValidationError | NetworkError;

const validateEmail = (email: string): E.Either<ValidationError, string> =>
  email.includes('@')
    ? E.right(email)
    : E.left({ type: 'ValidationError', message: 'Invalid email' });

const createUser = (
  email: string
): TE.TaskEither<ApiError, { id: number; email: string }> =>
  pipe(
    validateEmail(email),
    E.fold(
      (error) => TE.left(error),
      (validEmail) =>
        TE.tryCatch(
          () =>
            fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({ email: validEmail })
            }).then(res => res.json()),
          (): ApiError => ({
            type: 'NetworkError',
            message: 'Failed to create user'
          })
        )
    )
  );

// Usage
createUser('alice@example.com')().then(result =>
  pipe(
    result,
    E.fold(
      (error) => {
        if (error.type === 'ValidationError') {
          console.error('Validation failed:', error.message);
        } else {
          console.error('Network error:', error.message);
        }
      },
      (user) => console.log('User created:', user)
    )
  )
);
```

**Best Practices**:
- Use `pipe` for left-to-right data flow
- Prefer `Option` over nullable types
- Use `TaskEither` for async operations
- Leverage TypeScript's type inference
- Start with Either and Option before advanced types

---

### 3.4 Sanctuary

**Philosophy**:
- Refuge from unsafe JavaScript
- Runtime type checking
- No implicit type coercion
- Haskell-inspired API

**Installation**:
```bash
npm install sanctuary
```

**Features**:

```javascript
const S = require('sanctuary');

// Type-safe operations - throws on invalid types
S.add(2, 3);        // 5
S.add(2, '3');      // TypeError: Invalid value

// Maybe type
const maybeUser = S.Just({ name: 'Alice', age: 30 });
const noUser = S.Nothing;

S.map(u => u.name, maybeUser);  // Just('Alice')
S.map(u => u.name, noUser);     // Nothing

// Either type
const validateAge = age =>
  age >= 18
    ? S.Right(age)
    : S.Left('Too young');

S.either(
  error => `Error: ${error}`,
  age => `Valid age: ${age}`,
  validateAge(25)
); // 'Valid age: 25'

// Composition
const { pipe } = S;

const processUser = pipe([
  S.get(S.is(Object))('user'),
  S.chain(S.get(S.is(String))('name')),
  S.map(S.toUpper)
]);

processUser({ user: { name: 'alice' } }); // Just('ALICE')
processUser({ user: {} });                 // Nothing
processUser({});                           // Nothing
```

**When to Use Sanctuary**:
- Maximum type safety required
- Working with critical financial/medical data
- Want runtime type checking
- Prefer Haskell-style API

**Trade-offs**:
- Runtime overhead from type checking
- Steeper learning curve
- Less flexible than Ramda (by design)
- Smaller community

---

### 3.5 Library Comparison Summary

| Feature | Ramda | Lodash/fp | fp-ts | Sanctuary |
|---------|-------|-----------|-------|-----------|
| **Auto-currying** | Yes | Yes | Manual | Yes |
| **Immutable** | Yes | Yes | Yes | Yes |
| **Type safety** | No | No | TypeScript | Runtime |
| **Bundle size** | ~14KB | ~5KB (tree-shaken) | ~10KB | ~30KB |
| **Learning curve** | Medium | Easy | Hard | Hard |
| **Community** | Large | Very Large | Growing | Small |
| **Best for** | FP focus | Mixed paradigm | TypeScript | Type safety |

**Recommendation**:
- **Starting FP**: Lodash/fp (familiar, easy)
- **Full FP commitment**: Ramda (comprehensive, popular)
- **TypeScript projects**: fp-ts (type-safe)
- **Critical systems**: Sanctuary (runtime safety)

---

## 4. Error Handling

### 4.1 Railway Oriented Programming

**Concept**: Visualize data flow as railway tracks - success track and failure track.

**Benefits**:
- Clear visualization of error flow
- Composable error handling
- No try-catch blocks scattered everywhere
- Errors are values, not exceptions

**Implementation**:

```javascript
// Result type (Either alias)
class Result {
  static success(value) {
    return new Success(value);
  }

  static failure(error) {
    return new Failure(error);
  }

  static fromNullable(value, error) {
    return value !== null && value !== undefined
      ? Result.success(value)
      : Result.failure(error);
  }

  static tryCatch(fn, errorMapper = e => e) {
    try {
      return Result.success(fn());
    } catch (error) {
      return Result.failure(errorMapper(error));
    }
  }
}

class Success {
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Result.success(fn(this._value));
  }

  flatMap(fn) {
    return fn(this._value);
  }

  mapError(fn) {
    return this;
  }

  fold(onError, onSuccess) {
    return onSuccess(this._value);
  }

  isSuccess() {
    return true;
  }

  isFailure() {
    return false;
  }
}

class Failure {
  constructor(error) {
    this._error = error;
  }

  map(fn) {
    return this;
  }

  flatMap(fn) {
    return this;
  }

  mapError(fn) {
    return Result.failure(fn(this._error));
  }

  fold(onError, onSuccess) {
    return onError(this._error);
  }

  isSuccess() {
    return false;
  }

  isFailure() {
    return true;
  }
}

// Railway functions - convert regular functions to railway
const bind = fn => result =>
  result.flatMap(value => {
    try {
      return fn(value);
    } catch (error) {
      return Result.failure(error);
    }
  });

const tee = fn => result =>
  result.map(value => {
    fn(value); // side effect
    return value;
  });

const map = fn => result => result.map(fn);
```

**Real-World Example**:

```javascript
// User registration pipeline
const validateEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? Result.success(email)
    : Result.failure({ field: 'email', message: 'Invalid email format' });

const validatePassword = password =>
  password.length >= 8
    ? Result.success(password)
    : Result.failure({ field: 'password', message: 'Password too short' });

const checkEmailUnique = email =>
  Result.tryCatch(
    () => {
      const exists = db.users.findByEmail(email);
      if (exists) throw new Error('Email already exists');
      return email;
    },
    error => ({ field: 'email', message: error.message })
  );

const hashPassword = password =>
  Result.tryCatch(
    () => bcrypt.hashSync(password, 10),
    error => ({ field: 'password', message: 'Failed to hash password' })
  );

const saveUser = user =>
  Result.tryCatch(
    () => db.users.create(user),
    error => ({ field: 'database', message: error.message })
  );

const sendWelcomeEmail = user =>
  Result.tryCatch(
    () => emailService.send(user.email, 'Welcome!'),
    error => ({ field: 'email', message: 'Failed to send email' })
  )
  .map(() => user); // Continue with user data

// Compose the pipeline
const registerUser = ({ email, password }) =>
  validateEmail(email)
    .flatMap(checkEmailUnique)
    .flatMap(() => validatePassword(password))
    .flatMap(hashPassword)
    .flatMap(hashedPassword =>
      saveUser({ email, password: hashedPassword })
    )
    .flatMap(sendWelcomeEmail);

// Usage
registerUser({ email: 'alice@example.com', password: 'secret123' })
  .fold(
    error => ({
      success: false,
      error: error.message,
      field: error.field
    }),
    user => ({
      success: true,
      data: { id: user.id, email: user.email }
    })
  );
```

**Async Railway**:

```javascript
class AsyncResult {
  constructor(promise) {
    this.promise = promise;
  }

  static success(value) {
    return new AsyncResult(Promise.resolve(Result.success(value)));
  }

  static failure(error) {
    return new AsyncResult(Promise.resolve(Result.failure(error)));
  }

  static fromPromise(promise, errorMapper = e => e) {
    return new AsyncResult(
      promise
        .then(Result.success)
        .catch(error => Result.failure(errorMapper(error)))
    );
  }

  map(fn) {
    return new AsyncResult(
      this.promise.then(result => result.map(fn))
    );
  }

  flatMap(fn) {
    return new AsyncResult(
      this.promise.then(result =>
        result.isSuccess()
          ? fn(result._value).promise
          : Promise.resolve(result)
      )
    );
  }

  mapError(fn) {
    return new AsyncResult(
      this.promise.then(result => result.mapError(fn))
    );
  }

  async fold(onError, onSuccess) {
    const result = await this.promise;
    return result.fold(onError, onSuccess);
  }
}

// Async pipeline
const fetchUser = id =>
  AsyncResult.fromPromise(
    fetch(`/api/users/${id}`).then(res => res.json()),
    error => `Failed to fetch user: ${error.message}`
  );

const validateUser = user =>
  user.active
    ? AsyncResult.success(user)
    : AsyncResult.failure('User is not active');

const fetchPosts = user =>
  AsyncResult.fromPromise(
    fetch(`/api/posts?userId=${user.id}`).then(res => res.json()),
    error => `Failed to fetch posts: ${error.message}`
  )
  .map(posts => ({ ...user, posts }));

const processUser = id =>
  fetchUser(id)
    .flatMap(validateUser)
    .flatMap(fetchPosts);

// Usage
await processUser(123).fold(
  error => console.error('Error:', error),
  data => console.log('Success:', data)
);
```

---

### 4.2 Error Accumulation

**Problem**: Railway stops at first error, but sometimes you want all errors.

**Solution**: Validation type that accumulates errors.

```javascript
class Validation {
  static success(value) {
    return new ValidationSuccess(value);
  }

  static failure(errors) {
    return new ValidationFailure(Array.isArray(errors) ? errors : [errors]);
  }

  static all(validations) {
    const failures = validations.filter(v => v.isFailure());

    if (failures.length > 0) {
      const allErrors = failures.flatMap(f => f._errors);
      return Validation.failure(allErrors);
    }

    return Validation.success(validations.map(v => v._value));
  }
}

class ValidationSuccess {
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Validation.success(fn(this._value));
  }

  isSuccess() {
    return true;
  }

  isFailure() {
    return false;
  }

  fold(onFailure, onSuccess) {
    return onSuccess(this._value);
  }
}

class ValidationFailure {
  constructor(errors) {
    this._errors = errors;
  }

  map(fn) {
    return this;
  }

  isSuccess() {
    return false;
  }

  isFailure() {
    return true;
  }

  fold(onFailure, onSuccess) {
    return onFailure(this._errors);
  }
}

// Usage
const validateName = name =>
  name && name.length >= 2
    ? Validation.success(name)
    : Validation.failure({ field: 'name', message: 'Name too short' });

const validateEmail = email =>
  email && email.includes('@')
    ? Validation.success(email)
    : Validation.failure({ field: 'email', message: 'Invalid email' });

const validateAge = age =>
  age && age >= 18
    ? Validation.success(age)
    : Validation.failure({ field: 'age', message: 'Must be 18+' });

// Collect all errors
const validateUser = data => {
  const validations = [
    validateName(data.name),
    validateEmail(data.email),
    validateAge(data.age)
  ];

  return Validation.all(validations).map(([name, email, age]) => ({
    name,
    email,
    age
  }));
};

// Test with invalid data
validateUser({ name: 'A', email: 'invalid', age: 15 })
  .fold(
    errors => console.log('Validation errors:', errors),
    user => console.log('Valid user:', user)
  );
// Validation errors: [
//   { field: 'name', message: 'Name too short' },
//   { field: 'email', message: 'Invalid email' },
//   { field: 'age', message: 'Must be 18+' }
// ]
```

---

### 4.3 Comparison with Traditional Error Handling

```javascript
// Traditional try-catch - imperative
async function processUserTraditional(userId) {
  try {
    const user = await fetchUser(userId);

    if (!user.active) {
      throw new Error('User not active');
    }

    try {
      const posts = await fetchPosts(user.id);
      return { ...user, posts };
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return { ...user, posts: [] };
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error; // or return default?
  }
}

// Functional - declarative
const processUserFunctional = userId =>
  fetchUser(userId)
    .flatMap(validateUserActive)
    .flatMap(user =>
      fetchPosts(user.id)
        .mapError(() => []) // Default to empty array on error
        .map(posts => ({ ...user, posts }))
    );

// Clearer error handling
await processUserFunctional(123).fold(
  error => ({ success: false, error }),
  data => ({ success: true, data })
);
```

**Benefits of Functional Approach**:
- Explicit error paths
- Composable error handling
- No silent failures
- Type-safe (with TypeScript)
- Easier to test
- No nested try-catch blocks

---

## 5. State Management

### 5.1 Immutable Updates

**Core Principle**: Never mutate, always create new versions.

**Basic Techniques**:

```javascript
// Object updates
const user = { name: 'Alice', age: 30, city: 'NYC' };

// BAD - mutation
user.age = 31;

// GOOD - spread operator
const updated = { ...user, age: 31 };

// GOOD - Object.assign (creates new object)
const updated = Object.assign({}, user, { age: 31 });

// Array updates
const numbers = [1, 2, 3, 4, 5];

// BAD - mutation
numbers.push(6);
numbers[0] = 0;

// GOOD - immutable operations
const withSix = [...numbers, 6];
const withoutFirst = numbers.slice(1);
const doubled = numbers.map(n => n * 2);
const withZeroFirst = [0, ...numbers.slice(1)];

// Insert at index
const insertAt = (arr, index, value) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index)
];

// Remove at index
const removeAt = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1)
];

// Update at index
const updateAt = (arr, index, fn) => [
  ...arr.slice(0, index),
  fn(arr[index]),
  ...arr.slice(index + 1)
];

// Usage
const nums = [1, 2, 3, 4, 5];
insertAt(nums, 2, 99);  // [1, 2, 99, 3, 4, 5]
removeAt(nums, 2);       // [1, 2, 4, 5]
updateAt(nums, 2, n => n * 10); // [1, 2, 30, 4, 5]
```

**Nested Updates**:

```javascript
const state = {
  user: {
    profile: {
      name: 'Alice',
      email: 'alice@example.com'
    },
    preferences: {
      theme: 'dark',
      notifications: true
    }
  },
  posts: [
    { id: 1, title: 'First Post', likes: 10 },
    { id: 2, title: 'Second Post', likes: 5 }
  ]
};

// Update nested object property
const updateEmail = (state, newEmail) => ({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      email: newEmail
    }
  }
});

// Update item in array
const likePost = (state, postId) => ({
  ...state,
  posts: state.posts.map(post =>
    post.id === postId
      ? { ...post, likes: post.likes + 1 }
      : post
  )
});

// Helper for deep updates
const updateIn = (obj, path, fn) => {
  if (path.length === 0) return fn(obj);

  const [head, ...tail] = path;

  return {
    ...obj,
    [head]: updateIn(obj[head], tail, fn)
  };
};

// Usage
const newState = updateIn(
  state,
  ['user', 'profile', 'email'],
  () => 'newemail@example.com'
);
```

---

### 5.2 Lenses

**Definition**: Functional getters and setters for immutable data structures.

**Benefits**:
- Composable accessors
- Immutable by default
- Reusable across codebase
- Type-safe (with TypeScript)

**Implementation**:

```javascript
// Lens constructor
const lens = (getter, setter) => ({
  get: getter,
  set: setter
});

// Basic lens operations
const view = (lens, obj) => lens.get(obj);

const set = (lens, value, obj) => lens.set(value, obj);

const over = (lens, fn, obj) => lens.set(fn(lens.get(obj)), obj);

// Property lens
const prop = key => lens(
  obj => obj[key],
  (value, obj) => ({ ...obj, [key]: value })
);

// Path lens
const path = keys => lens(
  obj => keys.reduce((acc, key) => acc?.[key], obj),
  (value, obj) => {
    if (keys.length === 0) return value;
    const [head, ...tail] = keys;
    return {
      ...obj,
      [head]: set(path(tail), value, obj[head] || {})
    };
  }
);

// Usage
const user = {
  name: 'Alice',
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

const nameLens = prop('name');
const cityLens = path(['address', 'city']);

view(nameLens, user);              // 'Alice'
view(cityLens, user);              // 'NYC'

set(nameLens, 'Bob', user);        // { name: 'Bob', address: { ... } }
set(cityLens, 'LA', user);         // { ..., address: { city: 'LA', ... } }

over(nameLens, s => s.toUpperCase(), user); // { name: 'ALICE', ... }
over(cityLens, s => s.toLowerCase(), user); // { ..., address: { city: 'nyc', ... } }
```

**Lens Composition**:

```javascript
const compose = (lens1, lens2) => lens(
  obj => view(lens2, view(lens1, obj)),
  (value, obj) => set(lens1, set(lens2, value, view(lens1, obj)), obj)
);

// Usage
const addressLens = prop('address');
const cityLens = prop('city');
const userCityLens = compose(addressLens, cityLens);

view(userCityLens, user); // 'NYC'
set(userCityLens, 'LA', user); // Updates user.address.city to 'LA'
```

**Ramda Lenses**:

```javascript
import * as R from 'ramda';

const user = {
  name: 'Alice',
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

// Create lenses
const nameLens = R.lensProp('name');
const addressLens = R.lensProp('address');
const cityLens = R.lensProp('city');

// Compose lenses
const addressCityLens = R.compose(addressLens, cityLens);
// or
const addressCityLens = R.lensPath(['address', 'city']);

// View
R.view(nameLens, user);           // 'Alice'
R.view(addressCityLens, user);    // 'NYC'

// Set
R.set(nameLens, 'Bob', user);     // { name: 'Bob', ... }
R.set(addressCityLens, 'LA', user); // { ..., address: { city: 'LA', ... } }

// Over (transform)
R.over(nameLens, R.toUpper, user);      // { name: 'ALICE', ... }
R.over(addressCityLens, R.toLower, user); // { ..., address: { city: 'nyc', ... } }
```

**Practical Example: React State**:

```javascript
import * as R from 'ramda';

// State shape
const initialState = {
  user: {
    profile: {
      name: '',
      email: ''
    },
    settings: {
      theme: 'light',
      notifications: true
    }
  },
  posts: []
};

// Lenses
const userLens = R.lensPath(['user']);
const profileLens = R.lensPath(['user', 'profile']);
const nameLens = R.lensPath(['user', 'profile', 'name']);
const emailLens = R.lensPath(['user', 'profile', 'email']);
const themeLens = R.lensPath(['user', 'settings', 'theme']);
const postsLens = R.lensPath(['posts']);

// Actions (return updated state)
const setName = name => state => R.set(nameLens, name, state);
const setEmail = email => state => R.set(emailLens, email, state);
const toggleTheme = state =>
  R.over(themeLens, theme => theme === 'light' ? 'dark' : 'light', state);
const addPost = post => state =>
  R.over(postsLens, posts => [...posts, post], state);

// Usage in reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return setName(action.payload)(state);
    case 'SET_EMAIL':
      return setEmail(action.payload)(state);
    case 'TOGGLE_THEME':
      return toggleTheme(state);
    case 'ADD_POST':
      return addPost(action.payload)(state);
    default:
      return state;
  }
};
```

---

### 5.3 Reducers

**Definition**: Pure functions that take current state and action, return new state.

**Pattern**: `(state, action) => newState`

**Benefits**:
- Predictable state transitions
- Easy to test
- Time-travel debugging
- Serializable actions

```javascript
// Simple counter reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};

// Complex app reducer
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload
      };

    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.updates }
            : user
        )
      };

    default:
      return state;
  }
};

// Action creators
const fetchUsersRequest = () => ({ type: 'FETCH_USERS_REQUEST' });
const fetchUsersSuccess = users => ({ type: 'FETCH_USERS_SUCCESS', payload: users });
const fetchUsersFailure = error => ({ type: 'FETCH_USERS_FAILURE', payload: error });
const setCurrentUser = user => ({ type: 'SET_CURRENT_USER', payload: user });
const updateUser = (id, updates) => ({ type: 'UPDATE_USER', payload: { id, updates } });
```

**Reducer Composition**:

```javascript
// Combine reducers
const combineReducers = reducers => (state = {}, action) => {
  return Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});
};

// Individual reducers
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_USER':
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};

const settingsReducer = (state = { theme: 'light' }, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  users: usersReducer,
  settings: settingsReducer
});

// State shape: { users: [...], settings: {...} }
```

---

## 6. Data Transformations

### 6.1 Pipe and Compose

**Pipe**: Left-to-right composition (Unix-style)

```javascript
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Example
const processData = pipe(
  trim,
  lowercase,
  removeSpecialChars,
  capitalize
);

processData('  Hello, World!  '); // 'Hello world'
```

**Compose**: Right-to-left composition (mathematical)

```javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// Example (reads bottom-to-up)
const processData = compose(
  capitalize,
  removeSpecialChars,
  lowercase,
  trim
);
```

**When to Use Each**:
- **Pipe**: More intuitive, reads like a story
- **Compose**: Mathematical convention, useful for HOCs

**Async Pipe**:

```javascript
const pipeAsync = (...fns) => x =>
  fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));

// Usage
const processUser = pipeAsync(
  fetchUser,
  validateUser,
  enrichUserData,
  saveUser
);

await processUser(userId);
```

---

### 6.2 Transducers

**Problem**: Multiple array operations create intermediate arrays.

```javascript
// Three iterations, two intermediate arrays
const result = numbers
  .filter(x => x % 2 === 0)  // [2, 4, 6, 8, 10]
  .map(x => x * 2)           // [4, 8, 12, 16, 20]
  .reduce((sum, x) => sum + x, 0); // 60
```

**Solution**: Transducers compose transformations into single pass.

**Basic Transducer**:

```javascript
// Transducer: transform a reducer
const map = fn => reducer => (acc, value) => reducer(acc, fn(value));

const filter = predicate => reducer => (acc, value) =>
  predicate(value) ? reducer(acc, value) : acc;

// Compose transducers
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const transduce = (xform, reducer, init, coll) =>
  coll.reduce(xform(reducer), init);

// Usage
const isEven = x => x % 2 === 0;
const double = x => x * 2;

const xform = compose(
  filter(isEven),
  map(double)
);

const result = transduce(
  xform,
  (sum, x) => sum + x,
  0,
  [1, 2, 3, 4, 5, 6]
); // 60 - only one iteration!
```

**Practical Transducer Example**:

```javascript
// Build your own transduce
const transduce = (xform, reducer, init) => array => {
  const xf = xform(reducer);
  return array.reduce(xf, init);
};

// Array builder reducer
const arrayReducer = (acc, value) => {
  acc.push(value);
  return acc;
};

// Create transformation
const processNumbers = compose(
  filter(x => x > 0),
  filter(x => x % 2 === 0),
  map(x => x * 2),
  map(x => ({ value: x, doubled: true }))
);

// Execute
const result = transduce(processNumbers, arrayReducer, [])([
  -2, -1, 0, 1, 2, 3, 4, 5, 6
]);
// [{ value: 4, doubled: true }, { value: 8, doubled: true }, { value: 12, doubled: true }]
```

**When to Use Transducers**:
- Large datasets (100k+ items)
- Multiple transformation steps
- Performance is critical
- Working with streams

**When NOT to Use**:
- Small arrays (< 1000 items)
- Single transformation
- Readability is priority
- Team unfamiliar with concept

**Performance Comparison**:

```javascript
// Benchmark: 1 million items
const data = Array.from({ length: 1_000_000 }, (_, i) => i);

// Chained operations
console.time('chained');
const result1 = data
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .reduce((sum, x) => sum + x, 0);
console.timeEnd('chained'); // ~150ms

// Transducers
console.time('transducer');
const xform = compose(
  filter(x => x % 2 === 0),
  map(x => x * 2)
);
const result2 = transduce(xform, (sum, x) => sum + x, 0)(data);
console.timeEnd('transducer'); // ~80ms

// Single reduce (most efficient)
console.time('reduce');
const result3 = data.reduce((sum, x) =>
  x % 2 === 0 ? sum + (x * 2) : sum
, 0);
console.timeEnd('reduce'); // ~50ms
```

**Ramda Transducers**:

```javascript
import * as R from 'ramda';

const isEven = x => x % 2 === 0;
const double = x => x * 2;

// Transducer composition
const xform = R.compose(
  R.filter(isEven),
  R.map(double)
);

// into() applies transducer and collects into array
R.into([], xform, [1, 2, 3, 4, 5, 6]); // [4, 8, 12]

// transduce() with custom reducer
R.transduce(xform, R.add, 0, [1, 2, 3, 4, 5, 6]); // 24
```

---

### 6.3 Map/Filter/Reduce Patterns

**Core Array Methods**:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
numbers.map(x => x * 2);        // [2, 4, 6, 8, 10]
numbers.map(x => ({ value: x })); // [{ value: 1 }, ...]

// Filter - select elements
numbers.filter(x => x % 2 === 0);  // [2, 4]
numbers.filter(x => x > 3);        // [4, 5]

// Reduce - combine elements
numbers.reduce((sum, x) => sum + x, 0);  // 15
numbers.reduce((max, x) => Math.max(max, x), -Infinity); // 5
```

**Advanced Patterns**:

```javascript
// Group by
const groupBy = (fn, array) =>
  array.reduce((groups, item) => {
    const key = fn(item);
    return {
      ...groups,
      [key]: [...(groups[key] || []), item]
    };
  }, {});

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

groupBy(user => user.role, users);
// { admin: [{ name: 'Alice', ... }, { name: 'Charlie', ... }], user: [...] }

// Index by
const indexBy = (fn, array) =>
  array.reduce((index, item) => ({
    ...index,
    [fn(item)]: item
  }), {});

const usersById = indexBy(user => user.id, users);

// Partition
const partition = (predicate, array) =>
  array.reduce(
    ([pass, fail], item) =>
      predicate(item)
        ? [[...pass, item], fail]
        : [pass, [...fail, item]],
    [[], []]
  );

const [evens, odds] = partition(x => x % 2 === 0, numbers);

// Flatten
const flatten = array =>
  array.reduce(
    (flat, item) =>
      Array.isArray(item)
        ? [...flat, ...flatten(item)]
        : [...flat, item],
    []
  );

flatten([1, [2, [3, 4], 5], 6]); // [1, 2, 3, 4, 5, 6]

// Unique
const unique = array =>
  array.reduce(
    (acc, item) =>
      acc.includes(item) ? acc : [...acc, item],
    []
  );

unique([1, 2, 2, 3, 3, 3, 4]); // [1, 2, 3, 4]

// Count occurrences
const countBy = (fn, array) =>
  array.reduce((counts, item) => {
    const key = fn(item);
    return {
      ...counts,
      [key]: (counts[key] || 0) + 1
    };
  }, {});

countBy(x => x % 2 === 0 ? 'even' : 'odd', [1, 2, 3, 4, 5]);
// { odd: 3, even: 2 }
```

**Real-World Example**:

```javascript
// Process e-commerce orders
const orders = [
  { id: 1, user: 'alice', items: [{ price: 10 }, { price: 20 }], status: 'completed' },
  { id: 2, user: 'bob', items: [{ price: 30 }], status: 'pending' },
  { id: 3, user: 'alice', items: [{ price: 15 }, { price: 25 }], status: 'completed' }
];

// Calculate total revenue by user for completed orders
const revenueByUser = pipe(
  filter(order => order.status === 'completed'),
  map(order => ({
    user: order.user,
    total: order.items.reduce((sum, item) => sum + item.price, 0)
  })),
  groupBy(order => order.user),
  map(userOrders => userOrders.reduce((sum, order) => sum + order.total, 0))
);

revenueByUser(orders);
// { alice: 70, bob: 0 }
```

---

## 7. FP Architecture

### 7.1 Hexagonal Architecture (Ports & Adapters)

**Concept**: Isolate business logic from external dependencies.

**Structure**:
```
core/           # Business logic (pure functions)
  domain/       # Domain models
  use-cases/    # Application logic
ports/          # Interfaces for external systems
  inbound/      # APIs, GraphQL, CLI
  outbound/     # Database, external APIs
adapters/       # Implementations of ports
  api/          # HTTP handlers
  db/           # Database implementations
  cache/        # Redis, etc.
```

**Example**:

```javascript
// core/domain/user.js - Pure domain logic
const createUser = ({ email, password, name }) => ({
  email,
  password,
  name,
  createdAt: new Date().toISOString(),
  active: true
});

const validateUser = user =>
  user.email && user.email.includes('@')
    ? Result.success(user)
    : Result.failure('Invalid email');

// core/use-cases/registerUser.js - Application logic
const registerUser = (userRepo, emailService, hashService) => async userData => {
  return await Result.success(userData)
    .flatMap(validateUser)
    .flatMap(user =>
      hashService.hash(user.password)
        .map(hashedPassword => ({ ...user, password: hashedPassword }))
    )
    .flatMapAsync(user => userRepo.create(user))
    .flatMapAsync(user => emailService.sendWelcome(user.email).map(() => user))
    .fold(
      error => ({ success: false, error }),
      user => ({ success: true, data: user })
    );
};

// ports/outbound/userRepository.js - Interface
const UserRepository = {
  create: user => Promise<Result<User, Error>>,
  findByEmail: email => Promise<Result<User, Error>>,
  update: (id, updates) => Promise<Result<User, Error>>
};

// adapters/db/mongoUserRepository.js - Implementation
const createMongoUserRepository = mongoClient => ({
  create: async user => {
    try {
      const result = await mongoClient.db().collection('users').insertOne(user);
      return Result.success({ ...user, id: result.insertedId });
    } catch (error) {
      return Result.failure(error);
    }
  },

  findByEmail: async email => {
    try {
      const user = await mongoClient.db().collection('users').findOne({ email });
      return user ? Result.success(user) : Result.failure('User not found');
    } catch (error) {
      return Result.failure(error);
    }
  },

  update: async (id, updates) => {
    try {
      const result = await mongoClient.db().collection('users')
        .findOneAndUpdate(
          { _id: id },
          { $set: updates },
          { returnDocument: 'after' }
        );
      return Result.success(result.value);
    } catch (error) {
      return Result.failure(error);
    }
  }
});

// adapters/api/userRoutes.js - HTTP adapter
const createUserRoutes = registerUserUseCase => ({
  'POST /users': async (req, res) => {
    const result = await registerUserUseCase(req.body);

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(400).json({ error: result.error });
    }
  }
});

// app.js - Wire everything together
const mongoClient = await MongoClient.connect(process.env.MONGO_URI);
const userRepo = createMongoUserRepository(mongoClient);
const emailService = createEmailService(process.env.SENDGRID_KEY);
const hashService = createHashService();

const registerUserUseCase = registerUser(userRepo, emailService, hashService);
const userRoutes = createUserRoutes(registerUserUseCase);

app.post('/users', userRoutes['POST /users']);
```

**Benefits**:
- Business logic independent of frameworks
- Easy to test (mock adapters)
- Swap implementations easily
- Clear boundaries

---

### 7.2 Dependency Injection (FP Style)

**Concept**: Pass dependencies as parameters, not global imports.

**Traditional (BAD)**:

```javascript
// service.js
import db from './db';
import logger from './logger';

const createUser = async userData => {
  logger.info('Creating user');
  const user = await db.users.create(userData);
  return user;
};
```

**Problems**:
- Hard to test (need to mock modules)
- Tight coupling to implementations
- Hidden dependencies

**Functional (GOOD)**:

```javascript
// service.js - Pure function
const createUser = (db, logger) => async userData => {
  logger.info('Creating user');
  const user = await db.users.create(userData);
  return user;
};

// Inject dependencies
const dbClient = createDbClient(config.db);
const logger = createLogger(config.log);
const createUserService = createUser(dbClient, logger);

// Easy to test
test('createUser', async () => {
  const mockDb = { users: { create: jest.fn().mockResolvedValue({ id: 1 }) } };
  const mockLogger = { info: jest.fn() };

  const service = createUser(mockDb, mockLogger);
  const result = await service({ name: 'Alice' });

  expect(result.id).toBe(1);
  expect(mockLogger.info).toHaveBeenCalledWith('Creating user');
});
```

**Reader Monad Pattern**:

```javascript
class Reader {
  constructor(fn) {
    this.fn = fn;
  }

  static of(value) {
    return new Reader(() => value);
  }

  static ask() {
    return new Reader(env => env);
  }

  map(fn) {
    return new Reader(env => fn(this.fn(env)));
  }

  flatMap(fn) {
    return new Reader(env => fn(this.fn(env)).fn(env));
  }

  run(env) {
    return this.fn(env);
  }
}

// Usage
const getConfig = key =>
  Reader.ask().map(env => env[key]);

const createUser = userData =>
  Reader.ask().flatMap(({ db, logger }) =>
    Reader.of(async () => {
      logger.info('Creating user');
      return await db.users.create(userData);
    })
  );

// Execute with environment
const env = { db: dbClient, logger: logger };
const result = await createUser({ name: 'Alice' }).run(env)();
```

---

### 7.3 Event Sourcing (Functional Style)

**Concept**: Store events, not state. Derive state from events.

```javascript
// Events - immutable facts
const events = [
  { type: 'UserRegistered', data: { email: 'alice@example.com' }, timestamp: '2024-01-01' },
  { type: 'ProfileUpdated', data: { name: 'Alice' }, timestamp: '2024-01-02' },
  { type: 'EmailChanged', data: { email: 'alice@newdomain.com' }, timestamp: '2024-01-03' }
];

// Reducer - pure function
const userReducer = (state = {}, event) => {
  switch (event.type) {
    case 'UserRegistered':
      return {
        ...state,
        email: event.data.email,
        registeredAt: event.timestamp
      };

    case 'ProfileUpdated':
      return {
        ...state,
        ...event.data
      };

    case 'EmailChanged':
      return {
        ...state,
        email: event.data.email,
        emailChangedAt: event.timestamp
      };

    default:
      return state;
  }
};

// Derive current state
const currentState = events.reduce(userReducer, {});
// { email: 'alice@newdomain.com', name: 'Alice', registeredAt: '2024-01-01', emailChangedAt: '2024-01-03' }

// Time travel - state at any point
const stateAtTime = timestamp =>
  events
    .filter(event => event.timestamp <= timestamp)
    .reduce(userReducer, {});

stateAtTime('2024-01-02');
// { email: 'alice@example.com', name: 'Alice', registeredAt: '2024-01-01' }
```

**Benefits**:
- Complete audit trail
- Time-travel debugging
- Replayable events
- Easy to add projections

---

## 8. Testing FP Code

### 8.1 Testing Pure Functions

**Why Easy**:
- No setup/teardown needed
- No mocks required
- Deterministic outputs
- Parallelizable

```javascript
// Function to test
const add = (a, b) => a + b;

// Test - simple!
test('add', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(0, 0)).toBe(0);
  expect(add(-1, 1)).toBe(0);
});

// Complex function
const processOrder = order => ({
  ...order,
  total: order.items.reduce((sum, item) => sum + item.price, 0),
  tax: order.items.reduce((sum, item) => sum + item.price, 0) * 0.1,
  processed: true
});

// Test
test('processOrder', () => {
  const order = {
    id: 1,
    items: [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 }
    ]
  };

  const result = processOrder(order);

  expect(result.total).toBe(30);
  expect(result.tax).toBe(3);
  expect(result.processed).toBe(true);
  expect(result.id).toBe(1); // Original data preserved
});
```

---

### 8.2 Property-Based Testing

**Concept**: Test properties that should always hold, not specific examples.

**Library**: fast-check

```bash
npm install --save-dev fast-check
```

**Example**:

```javascript
import fc from 'fast-check';

// Property: reversing twice returns original
test('reverse property', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), arr => {
      const reversed = arr.slice().reverse();
      const doubleReversed = reversed.slice().reverse();
      expect(doubleReversed).toEqual(arr);
    })
  );
});

// Property: adding commutative
test('add commutative', () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      expect(add(a, b)).toBe(add(b, a));
    })
  );
});

// Property: map preserves length
test('map preserves length', () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer()),
      fc.func(fc.integer()),
      (arr, fn) => {
        expect(arr.map(fn).length).toBe(arr.length);
      }
    )
  );
});

// Real-world: validation
const validateEmail = email =>
  email && email.includes('@') && email.includes('.')
    ? Result.success(email)
    : Result.failure('Invalid email');

test('validateEmail properties', () => {
  // Property: valid emails always succeed
  fc.assert(
    fc.property(
      fc.emailAddress(),
      email => {
        const result = validateEmail(email);
        expect(result.isSuccess()).toBe(true);
      }
    )
  );

  // Property: strings without @ always fail
  fc.assert(
    fc.property(
      fc.string().filter(s => !s.includes('@')),
      str => {
        const result = validateEmail(str);
        expect(result.isFailure()).toBe(true);
      }
    )
  );
});
```

**Shrinking**: fast-check automatically finds minimal failing case.

```javascript
// This will fail and fast-check will find the smallest failing array
test('sum should never exceed 100', () => {
  fc.assert(
    fc.property(
      fc.array(fc.integer(1, 50), { minLength: 1, maxLength: 10 }),
      arr => {
        const sum = arr.reduce((a, b) => a + b, 0);
        expect(sum).toBeLessThan(100);
      }
    )
  );
});
// Fails with: [50, 50] (shrunk from larger array)
```

**Custom Arbitraries**:

```javascript
// Generate valid user objects
const userArbitrary = fc.record({
  id: fc.integer({ min: 1 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  email: fc.emailAddress(),
  age: fc.integer({ min: 18, max: 120 }),
  active: fc.boolean()
});

test('processUser properties', () => {
  fc.assert(
    fc.property(userArbitrary, user => {
      const processed = processUser(user);

      // Properties that should always hold
      expect(processed.id).toBe(user.id);
      expect(processed.email).toBe(user.email.toLowerCase());
      expect(processed).toHaveProperty('processedAt');
    })
  );
});
```

---

### 8.3 Testing Compositions

```javascript
// Functions
const double = x => x * 2;
const increment = x => x + 1;
const square = x => x * x;

// Composition
const process = pipe(double, increment, square);

// Test individual functions
test('double', () => expect(double(5)).toBe(10));
test('increment', () => expect(increment(5)).toBe(6));
test('square', () => expect(square(5)).toBe(25));

// Test composition
test('process', () => {
  expect(process(2)).toBe(25);  // (2 * 2 + 1)^2 = 5^2 = 25
  expect(process(3)).toBe(49);  // (3 * 2 + 1)^2 = 7^2 = 49
});

// Property: composition associativity
test('composition is associative', () => {
  fc.assert(
    fc.property(fc.integer(), x => {
      const f = pipe(double, pipe(increment, square));
      const g = pipe(pipe(double, increment), square);
      expect(f(x)).toBe(g(x));
    })
  );
});
```

---

### 8.4 Testing Error Handling

```javascript
// Test Either/Result types
test('validateAge success', () => {
  const result = validateAge(25);

  expect(result.isSuccess()).toBe(true);
  result.fold(
    error => fail('Should not fail'),
    age => expect(age).toBe(25)
  );
});

test('validateAge failure', () => {
  const result = validateAge(15);

  expect(result.isFailure()).toBe(true);
  result.fold(
    error => expect(error).toBe('Must be 18 or older'),
    age => fail('Should not succeed')
  );
});

// Test async pipelines
test('user registration pipeline', async () => {
  const mockDb = { users: { create: jest.fn().mockResolvedValue({ id: 1 }) } };
  const mockEmail = { send: jest.fn().mockResolvedValue(true) };

  const register = registerUser(mockDb, mockEmail);
  const result = await register({
    email: 'alice@example.com',
    password: 'secret123'
  });

  expect(result.success).toBe(true);
  expect(result.data.id).toBe(1);
  expect(mockDb.users.create).toHaveBeenCalled();
  expect(mockEmail.send).toHaveBeenCalled();
});
```

---

## 9. Performance Considerations

### 9.1 Memoization

**When to Use**:
- Expensive pure functions
- Repeated calls with same arguments
- Recursive algorithms

**Implementation**:

```javascript
const memoize = fn => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Example: Fibonacci
const fib = memoize(n => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.time('fib(40)');
fib(40); // Fast!
console.timeEnd('fib(40)'); // ~2ms

// Without memoization: ~1000ms
```

**Cache Size Limits**:

```javascript
const memoizeWithLimit = (fn, limit = 100) => {
  const cache = new Map();
  const keys = [];

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);

    if (keys.length >= limit) {
      const oldKey = keys.shift();
      cache.delete(oldKey);
    }

    keys.push(key);
    cache.set(key, result);
    return result;
  };
};
```

**When NOT to Memoize**:
- Functions with side effects
- Large object returns (memory issues)
- Frequently changing arguments
- Cheap computations

---

### 9.2 Lazy Evaluation

**Concept**: Delay computation until result is needed.

**Generators**:

```javascript
// Infinite sequence (lazy)
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take only what you need
const take = (n, iterable) => {
  const result = [];
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }

  return result;
};

take(10, fibonacci()); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

**Lazy Sequences**:

```javascript
class LazySeq {
  constructor(iterable) {
    this.iterable = iterable;
  }

  static of(iterable) {
    return new LazySeq(iterable);
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  map(fn) {
    const self = this;
    return new LazySeq((function*() {
      for (const value of self) {
        yield fn(value);
      }
    })());
  }

  filter(predicate) {
    const self = this;
    return new LazySeq((function*() {
      for (const value of self) {
        if (predicate(value)) {
          yield value;
        }
      }
    })());
  }

  take(n) {
    const self = this;
    return new LazySeq((function*() {
      let count = 0;
      for (const value of self) {
        if (count >= n) break;
        yield value;
        count++;
      }
    })());
  }

  toArray() {
    return Array.from(this);
  }
}

// Usage - operations don't execute until toArray()
const result = LazySeq.of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .filter(x => x % 2 === 0)  // Not executed yet
  .map(x => x * 2)           // Not executed yet
  .take(3)                   // Not executed yet
  .toArray();                // NOW it executes - only 3 iterations!
// [4, 8, 12]
```

**Benefits**:
- Handle infinite sequences
- Process large datasets efficiently
- Avoid unnecessary computations

**Trade-offs**:
- Added complexity
- Delayed error detection
- Harder to debug

---

### 9.3 Tail Call Optimization

**Problem**: Recursive functions can cause stack overflow.

```javascript
// Stack overflow for large n
const factorial = n =>
  n <= 1 ? 1 : n * factorial(n - 1);

factorial(10000); // RangeError: Maximum call stack size exceeded
```

**Solution**: Tail-recursive form (TCO)

```javascript
// Tail-recursive (last operation is recursive call)
const factorial = (n, acc = 1) =>
  n <= 1 ? acc : factorial(n - 1, n * acc);

// Note: JavaScript engines don't reliably support TCO yet!
```

**Trampoline Pattern** (works without TCO):

```javascript
const trampoline = fn => (...args) => {
  let result = fn(...args);

  while (typeof result === 'function') {
    result = result();
  }

  return result;
};

// Tail-recursive with trampoline
const factorial = (n, acc = 1) =>
  n <= 1
    ? acc
    : () => factorial(n - 1, n * acc); // Return function, not result

const trampolinedFactorial = trampoline(factorial);
trampolinedFactorial(10000); // Works!
```

**When to Use**:
- Deep recursion required
- Tail-recursive pattern possible
- Stack overflow issues

---

### 9.4 Performance Benchmarks

```javascript
// Measure function performance
const benchmark = (fn, iterations = 1000) => {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const end = performance.now();
  return end - start;
};

// Compare implementations
const data = Array.from({ length: 10000 }, (_, i) => i);

const imperativeSum = () => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;
};

const functionalSum = () =>
  data.reduce((sum, x) => sum + x, 0);

console.log('Imperative:', benchmark(imperativeSum), 'ms');
console.log('Functional:', benchmark(functionalSum), 'ms');
// Imperative: ~15ms
// Functional: ~18ms (slightly slower, but negligible)
```

**Key Takeaways**:
- FP is often "fast enough"
- Optimize hot paths, not everything
- Readability > premature optimization
- Measure before optimizing

---

## 10. Real-World Examples

### 10.1 API Request Handler

```javascript
// Functional Express middleware
const asyncPipe = (...fns) => req =>
  fns.reduce(
    (promise, fn) => promise.then(fn),
    Promise.resolve(req)
  );

// Validation middleware
const validateBody = schema => req =>
  schema.validate(req.body)
    .fold(
      errors => Promise.reject({ status: 400, errors }),
      data => Promise.resolve({ ...req, validatedData: data })
    );

// Authentication middleware
const authenticate = async req => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return Promise.reject({ status: 401, message: 'No token provided' });
  }

  const user = await verifyToken(token);
  return { ...req, user };
};

// Authorization middleware
const authorize = roles => req => {
  if (!roles.includes(req.user.role)) {
    return Promise.reject({ status: 403, message: 'Insufficient permissions' });
  }
  return Promise.resolve(req);
};

// Business logic
const createPost = async req => {
  const post = await db.posts.create({
    ...req.validatedData,
    userId: req.user.id
  });

  return { status: 201, data: post };
};

// Compose handler
const createPostHandler = asyncPipe(
  validateBody(postSchema),
  authenticate,
  authorize(['user', 'admin']),
  createPost
);

// Express route
app.post('/posts', async (req, res) => {
  try {
    const result = await createPostHandler(req);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
```

---

### 10.2 Data Processing Pipeline

```javascript
// Process CSV data
const processCSV = pipe(
  // 1. Parse CSV
  csvData => csvData.split('\n'),

  // 2. Remove empty lines
  lines => lines.filter(line => line.trim()),

  // 3. Parse into objects
  lines => {
    const [header, ...rows] = lines;
    const keys = header.split(',');
    return rows.map(row => {
      const values = row.split(',');
      return keys.reduce((obj, key, i) => ({
        ...obj,
        [key.trim()]: values[i]?.trim()
      }), {});
    });
  },

  // 4. Validate data
  rows => rows.filter(row =>
    row.email &&
    row.name &&
    row.age &&
    !isNaN(row.age)
  ),

  // 5. Transform data
  rows => rows.map(row => ({
    email: row.email.toLowerCase(),
    name: row.name,
    age: parseInt(row.age),
    active: row.active === 'true'
  })),

  // 6. Group by age range
  rows => groupBy(
    row => {
      const age = row.age;
      if (age < 18) return 'minor';
      if (age < 65) return 'adult';
      return 'senior';
    },
    rows
  )
);

// Usage
const csvData = `
name,email,age,active
Alice,ALICE@example.com,30,true
Bob,bob@example.com,25,false
Charlie,charlie@example.com,70,true
`;

const result = processCSV(csvData);
// {
//   adult: [{ email: 'alice@example.com', name: 'Alice', age: 30, active: true }, ...],
//   senior: [{ email: 'charlie@example.com', name: 'Charlie', age: 70, active: true }]
// }
```

---

### 10.3 Form Validation

```javascript
// Validation rules
const required = fieldName => value =>
  value && value.trim()
    ? Result.success(value)
    : Result.failure({ field: fieldName, message: 'Required field' });

const minLength = (fieldName, min) => value =>
  value && value.length >= min
    ? Result.success(value)
    : Result.failure({ field: fieldName, message: `Minimum ${min} characters` });

const email = fieldName => value =>
  value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? Result.success(value)
    : Result.failure({ field: fieldName, message: 'Invalid email' });

const matches = (fieldName, otherField, otherValue) => value =>
  value === otherValue
    ? Result.success(value)
    : Result.failure({ field: fieldName, message: `Must match ${otherField}` });

// Compose validators
const validate = (value, ...validators) =>
  validators.reduce(
    (result, validator) => result.flatMap(() => validator(value)),
    Result.success(value)
  );

// Field validators
const validateEmail = value =>
  validate(value, required('email'), email('email'));

const validatePassword = value =>
  validate(value, required('password'), minLength('password', 8));

const validatePasswordConfirm = (value, password) =>
  validate(
    value,
    required('passwordConfirm'),
    matches('passwordConfirm', 'password', password)
  );

// Form validator
const validateRegistrationForm = form => {
  const emailResult = validateEmail(form.email);
  const passwordResult = validatePassword(form.password);
  const confirmResult = validatePasswordConfirm(form.passwordConfirm, form.password);

  // Collect all errors
  const errors = [emailResult, passwordResult, confirmResult]
    .filter(result => result.isFailure())
    .map(result => result.fold(error => error, () => null));

  if (errors.length > 0) {
    return Result.failure(errors);
  }

  return Result.success({
    email: form.email,
    password: form.password
  });
};

// Usage
const formData = {
  email: 'not-an-email',
  password: 'short',
  passwordConfirm: 'different'
};

validateRegistrationForm(formData).fold(
  errors => console.log('Validation errors:', errors),
  data => console.log('Valid data:', data)
);
// Validation errors: [
//   { field: 'email', message: 'Invalid email' },
//   { field: 'password', message: 'Minimum 8 characters' },
//   { field: 'passwordConfirm', message: 'Must match password' }
// ]
```

---

### 10.4 Business Logic - Order Processing

```javascript
// Domain types
const Order = {
  create: (items, customerId) => ({
    id: generateId(),
    customerId,
    items,
    status: 'pending',
    total: 0,
    createdAt: new Date().toISOString()
  })
};

// Business rules (pure functions)
const calculateTotal = order => ({
  ...order,
  total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
});

const applyDiscount = discount => order => ({
  ...order,
  total: order.total * (1 - discount),
  discount
});

const addTax = taxRate => order => ({
  ...order,
  tax: order.total * taxRate,
  total: order.total * (1 + taxRate)
});

const validateStock = async order => {
  const stockChecks = await Promise.all(
    order.items.map(item => checkStock(item.productId, item.quantity))
  );

  const outOfStock = stockChecks.filter(check => !check.available);

  if (outOfStock.length > 0) {
    return Result.failure({
      type: 'OutOfStock',
      items: outOfStock.map(s => s.productId)
    });
  }

  return Result.success(order);
};

const reserveStock = async order => {
  await Promise.all(
    order.items.map(item => reserveStockItem(item.productId, item.quantity))
  );

  return Result.success({ ...order, stockReserved: true });
};

const processPayment = async order => {
  const payment = await chargeCustomer(order.customerId, order.total);

  if (!payment.success) {
    return Result.failure({ type: 'PaymentFailed', reason: payment.error });
  }

  return Result.success({
    ...order,
    paymentId: payment.id,
    status: 'paid'
  });
};

const sendConfirmation = async order => {
  await emailService.send(
    order.customerId,
    'Order Confirmation',
    orderConfirmationTemplate(order)
  );

  return Result.success(order);
};

// Compose the pipeline
const processOrder = (items, customerId, { discount = 0, taxRate = 0.1 } = {}) =>
  AsyncResult.success(Order.create(items, customerId))
    .map(calculateTotal)
    .map(discount > 0 ? applyDiscount(discount) : identity)
    .map(addTax(taxRate))
    .flatMap(order => AsyncResult.fromPromise(validateStock(order)))
    .flatMap(order => AsyncResult.fromPromise(reserveStock(order)))
    .flatMap(order => AsyncResult.fromPromise(processPayment(order)))
    .flatMap(order => AsyncResult.fromPromise(sendConfirmation(order)));

// Usage
await processOrder(
  [
    { productId: 'prod-1', price: 29.99, quantity: 2 },
    { productId: 'prod-2', price: 49.99, quantity: 1 }
  ],
  'customer-123',
  { discount: 0.1, taxRate: 0.08 }
).fold(
  error => {
    if (error.type === 'OutOfStock') {
      console.error('Out of stock:', error.items);
    } else if (error.type === 'PaymentFailed') {
      console.error('Payment failed:', error.reason);
    } else {
      console.error('Order processing failed:', error);
    }
  },
  order => {
    console.log('Order processed successfully:', order);
  }
);
```

---

## 11. Migration Strategy

### 11.1 Gradual Adoption

**Step 1**: Start with pure utilities

```javascript
// Create utils/ folder with pure functions
// utils/string.js
export const trim = str => str.trim();
export const lowercase = str => str.toLowerCase();
export const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// utils/array.js
export const groupBy = (fn, arr) =>
  arr.reduce((groups, item) => {
    const key = fn(item);
    return { ...groups, [key]: [...(groups[key] || []), item] };
  }, {});

// Use in existing code
import { trim, lowercase } from './utils/string';

// Before
const email = user.email.trim().toLowerCase();

// After
const email = pipe(trim, lowercase)(user.email);
```

**Step 2**: Introduce composition in one module

```javascript
// Before: imperative
function processUserData(data) {
  const trimmed = data.trim();
  const parsed = JSON.parse(trimmed);
  const validated = validateUser(parsed);
  const normalized = normalizeUser(validated);
  return normalized;
}

// After: functional
const processUserData = pipe(
  trim,
  JSON.parse,
  validateUser,
  normalizeUser
);
```

**Step 3**: Refactor error handling

```javascript
// Before: try-catch everywhere
async function getUser(id) {
  try {
    const user = await db.users.find(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// After: Railway Oriented Programming
const getUser = id =>
  AsyncResult.fromPromise(
    db.users.find(id),
    error => `Database error: ${error.message}`
  )
  .flatMap(user =>
    user
      ? AsyncResult.success(user)
      : AsyncResult.failure('User not found')
  );
```

**Step 4**: Introduce immutability

```javascript
// Before: mutations
function updateUser(user, updates) {
  user.name = updates.name;
  user.email = updates.email;
  user.updatedAt = new Date();
  return user;
}

// After: immutable
const updateUser = (user, updates) => ({
  ...user,
  ...updates,
  updatedAt: new Date().toISOString()
});
```

**Step 5**: Adopt FP library gradually

```javascript
// Install Ramda or Lodash/fp
npm install ramda

// Start using in new code
import * as R from 'ramda';

const getActiveUserNames = R.pipe(
  R.filter(R.prop('active')),
  R.map(R.prop('name'))
);
```

---

### 11.2 Team Education

**Workshops**:
1. Pure functions & immutability (1 hour)
2. Composition & currying (1 hour)
3. Error handling with Either (1 hour)
4. Real-world refactoring session (2 hours)

**Code Review Guidelines**:
- Encourage pure functions
- Suggest composition over nesting
- Recommend immutable updates
- Share FP patterns in comments

**Documentation**:
- Create internal FP style guide
- Document common patterns
- Maintain example repository
- Run regular knowledge sharing sessions

---

### 11.3 Common Pitfalls During Migration

**Pitfall 1**: Over-engineering simple code

```javascript
// BAD - unnecessary complexity
const getFirstName = R.pipe(
  R.prop('name'),
  R.split(' '),
  R.head
);

// GOOD - simple is better
const getFirstName = user => user.name.split(' ')[0];
```

**Pitfall 2**: Forcing point-free style

```javascript
// BAD - hard to understand
const x = R.pipe(
  R.filter(R.propEq('active', true)),
  R.map(R.prop('name')),
  R.join(', ')
);

// GOOD - clear intent
const getActiveUserNames = users =>
  users
    .filter(user => user.active)
    .map(user => user.name)
    .join(', ');
```

**Pitfall 3**: Mixing paradigms inconsistently

```javascript
// BAD - confused style
const processData = data => {
  const filtered = data.filter(x => x > 0); // FP
  filtered.push(99); // Mutation!
  return R.sum(filtered); // FP
};

// GOOD - consistent FP
const processData = pipe(
  filter(x => x > 0),
  append(99),
  sum
);
```

---

## 12. Best Practices & Anti-Patterns

### 12.1 Best Practices

**1. Prefer Pure Functions**
```javascript
// GOOD
const calculateTax = (amount, rate) => amount * rate;

// BAD - side effect
let totalTax = 0;
const calculateTax = (amount, rate) => {
  totalTax += amount * rate;
  return totalTax;
};
```

**2. Keep Functions Small**
```javascript
// GOOD - single responsibility
const validateEmail = email => email.includes('@');
const normalizeEmail = email => email.toLowerCase().trim();
const processEmail = pipe(normalizeEmail, validateEmail);

// BAD - doing too much
const processEmail = email => {
  const trimmed = email.trim();
  const lower = trimmed.toLowerCase();
  const valid = lower.includes('@');
  if (!valid) throw new Error('Invalid');
  return lower;
};
```

**3. Use Descriptive Names**
```javascript
// GOOD
const filterActiveUsers = filter(user => user.active);
const getUserEmails = map(user => user.email);

// BAD
const f = filter(u => u.a);
const g = map(u => u.e);
```

**4. Handle Errors Explicitly**
```javascript
// GOOD
const parseJSON = str =>
  Result.tryCatch(
    () => JSON.parse(str),
    error => `Parse error: ${error.message}`
  );

// BAD - throws exception
const parseJSON = str => JSON.parse(str);
```

**5. Document Complex Logic**
```javascript
// GOOD
/**
 * Calculates compound interest using A = P(1 + r/n)^(nt)
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (e.g., 0.05 for 5%)
 * @param {number} compounds - Compounds per year
 * @param {number} years - Investment period in years
 * @returns {number} Final amount
 */
const compoundInterest = (principal, rate, compounds, years) =>
  principal * Math.pow(1 + rate / compounds, compounds * years);
```

**6. Use Type Hints (JSDoc or TypeScript)**
```javascript
/**
 * @param {Array<User>} users
 * @returns {Array<string>}
 */
const getUserNames = users => users.map(u => u.name);

// Or TypeScript
const getUserNames = (users: User[]): string[] =>
  users.map(u => u.name);
```

---

### 12.2 Anti-Patterns

**1. Overusing Point-Free Style**
```javascript
// BAD - too cryptic
const x = R.pipe(
  R.map(R.prop('x')),
  R.filter(R.gt(R.__, 5)),
  R.sum
);

// GOOD - readable
const sumOfXGreaterThan5 = items =>
  items
    .map(item => item.x)
    .filter(x => x > 5)
    .reduce((sum, x) => sum + x, 0);
```

**2. Unnecessary Abstractions**
```javascript
// BAD
const add = curry((a, b) => a + b);
const increment = add(1);
const x = increment(5);

// GOOD - simpler
const x = 5 + 1;
```

**3. Forcing FP Where Imperative is Clearer**
```javascript
// BAD
const factorial = n =>
  n <= 1
    ? 1
    : R.multiply(n, factorial(n - 1));

// GOOD - imperative is clearer here
const factorial = n => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
```

**4. Ignoring Performance**
```javascript
// BAD - creates many intermediate arrays
const result = data
  .map(transform1)
  .map(transform2)
  .map(transform3)
  .filter(predicate1)
  .filter(predicate2);

// GOOD - single pass
const result = data.reduce((acc, item) => {
  const t1 = transform1(item);
  const t2 = transform2(t1);
  const t3 = transform3(t2);
  if (predicate1(t3) && predicate2(t3)) {
    acc.push(t3);
  }
  return acc;
}, []);
```

**5. Not Using Built-in Methods**
```javascript
// BAD - reinventing the wheel
const map = fn => arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
};

// GOOD - use native
const map = fn => arr => arr.map(fn);
```

**6. Mutating in Pure Functions**
```javascript
// BAD - mutation!
const addItem = (arr, item) => {
  arr.push(item); // Mutates input!
  return arr;
};

// GOOD - immutable
const addItem = (arr, item) => [...arr, item];
```

**7. Side Effects in Mapping/Filtering**
```javascript
// BAD - side effect in map
users.map(user => {
  console.log(user); // Side effect!
  return user.name;
});

// GOOD - separate concerns
users.forEach(user => console.log(user)); // Side effect
const names = users.map(user => user.name); // Pure transformation
```

---

### 12.3 When NOT to Use FP

**1. Performance-Critical Loops**
```javascript
// Imperative is faster
for (let i = 0; i < 1000000; i++) {
  processItem(items[i]);
}

// FP is slower here
items.forEach(processItem);
```

**2. Frequent State Updates**
```javascript
// Game loop - imperative is better
function gameLoop() {
  player.x += velocity.x;
  player.y += velocity.y;
  checkCollisions();
  render();
}

// Don't force FP here
```

**3. Working with Mutable APIs**
```javascript
// DOM manipulation - inherently mutable
const element = document.getElementById('app');
element.classList.add('active'); // Mutation is fine here
```

**4. Team Unfamiliarity**
- Don't force FP on resistant team
- Gradual adoption is better
- Focus on wins (pure functions, immutability)
- Skip advanced patterns (monads, transducers)

---

## Conclusion

Functional programming in JavaScript offers powerful patterns for writing maintainable, testable, and robust code. Key takeaways:

**Start Simple**:
- Pure functions
- Immutability
- Basic composition

**Progress Gradually**:
- Higher-order functions
- Currying and partial application
- Error handling with Either/Result

**Master When Ready**:
- Monads and functors
- Lenses and optics
- Transducers and advanced patterns

**Remember**:
- FP is a tool, not a religion
- Balance readability and cleverness
- Measure performance when it matters
- Adapt to your team's skill level

**Resources**:
- [Ramda Documentation](https://ramdajs.com/)
- [fp-ts Documentation](https://gcanti.github.io/fp-ts/)
- [Professor Frisby's Mostly Adequate Guide](https://mostly-adequate.gitbook.io/)
- [Fast-check Documentation](https://fast-check.dev/)

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Research Sources**: 2024-2025 industry articles, documentation, and best practices

---

*This guide is a living document. Contributions and feedback welcome!*
