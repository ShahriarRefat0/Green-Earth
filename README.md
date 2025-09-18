> ### Questions and Answers:

#### 1) What is the difference between var, let, and const?

**Answer:**

- _var_
  - It's a function scoped. If declared outside of a function it will global scoped.
  - It declarations are hoisted to top of their scope and initiallized with undefined.
  - Can do reassing a new value.
  - Can do redeclare the same variable in the same scope.
- _let_
  - It's a block scoped.
  - It is hoisted but not initialized. Accessing it before declaretios gives a `ReferenceError`.
  - Can do reassing a new value.
  - Can't redeclare the same variable in the same scope.
- _const_
  - It's a block scoped.
  - It hoisted but not initialized.
  - Can't reassing a `const` variable.
  - If `const` holds an object or array content can change, but the variable can't point a new object.

#### 2) What is the difference between map(), forEach(), and filter()?

**Answer:**

- _map()_
  - it's executes a loop of every element
  - It's modify / transform every element and return a new array.
  - Original array remains unchanged.
    Example:
    ```
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
    ```
- _forEach()_
  - it's executes a loop of every element
  - It's not return anything
  - just use for side effect
    Example:
    ```
    const numbers = [1, 2, 3, 4, 5];
    numbers.forEach(n => console.log(n)); // logs: 1 2 3 4 5
    ```
- _filter()_
  - It's apply condition of every array's element.
  - It's only execute if codition pass and retun new array.
  - original array remains unchanged.
    Example:
    ```
    const numbers = [1, 2, 3, 4, 5];
    const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
    ```

#### 3) What are arrow functions in ES6?

**Answer:**

- Arrow function is a ES6 feature in JavaScript. Whice is a easiest way to wirte a function in JavaScript. Use arrow `=>` symbol to write a arrow function.
  Example:

```
//1. no need for function keyword.If function body has only one expression, we can omit {} and retun.
onst square = x => x * x;

//2. when using a single expresion without curly braces, the value is returned automatically.
const greet = () => "Hello!";
```

#### 4) How does destructuring assignment work in ES6?

**Answer:**

- Destructuring assignment is a ES6 feature.By using this we can separate array and object in a variable.
  Example:
  - _Array Destructuring_

```
const numbers = [10, 20, 30]; //array

onst [x, y, z] = numbers;

console.log(x); // 10
console.log(y); // 20
console.log(z); // 30

//----skip value in array----//
const [x, , z] = number;
console.log(x, z); // 10 30

//-----set default value in array---//
const [x, y, z, w = 40] = numbers;
console.log(w); // 40
```

- _object Destructuring_

```
const student = {
  name: "Refat",
  age: 25,
  city: "Barishal"
};

onst { name, age, city } = student;

console.log(name); // Refat
console.log(age);  // 25

//----rename variable in object----//
const { name: fullName, age: years } = student;
console.log(fullName); // Refat
console.log(years);    // 25

//-----set default value in object---//
onst { country = "Bangladesh" } = student;
console.log(country); // Bangladesh
```

#### 5) Explain template literals in ES6. How are they different from string concatenation?

**Answer:**

- Template literals is a ES6 feature in Javascript.Where we use backtick `` (`) ``.
  For this we can write variable, expression and multiline string.
  Exmaple:

```
const name = "Refat";
const age = 22;

consol.log(`My name is ${name}.
I am ${age} years old. After 2 years leter my age
will ${age + 2}.
`
//output//
My name is Refat.
I am 22 years old. After 2 years leter my age
will 24.
```

- _**different from string concatenation**_
  - concatenation with `+`:
    - messy and hear to read.
    - need add `+` for every varibale and space.
    - no direct support for multiline.
  - emplate literals with `` (`) ``
    - clear and easy to read
    - direct support for multiline.
    - can do expressions inside `${}`
