---
title: 'How `this` keyword is determined in Javascript'
excerpt: 'One of things makes developer confused most is `this` keyword in Javascript. There is no magic here, understanding the behavior of the `this` keyword is essential for writing effective and maintainable JavaScript code.'
date: '2022-12-25T00:00:00.000Z'
---

One of the most confused things in Javascript is the `this` keyword. It is a special identifier keyword and automatically defined and bind to a specific context at running-time of function call. Determining which context `this` keyword is pointing to is a easy-to-make-mistake work even seasoned developer.

## Keyword `this` in Javascript acts in a different way.

If you come from another OOP (Object Oriented Programming) language like `Java, C#, C++,...`, you may be very familiar with mentioning `this` keyword in a class and treat it like a `itself` object. It is very intuitive and `this` point to the same context wherever your function is invoked.

Unfortunately, `this` keyword in Javascript was not designed for OOP, it acts in a strange way and different from many other common languages. So, in my opinion, before learning `this` in Javascript, do not try to find any relations, or common traits with others.

## What is `this`?

Keyword `this` is not a thing which can be determined at writing-time (function declaration). Instead, we control it at running-time (function invocation) and know that which object `this` is pointing to. At this time, `this` acts like a normal object, it just looks like a replacement in your code.

So, `this` is contextual based on the conditions of the function's invocation, `this` binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called. The hard part to work with `this` is just to determine how function's execution will bind `this` or which object `this` is pointing to at that time. Let's see.

## Determine the `call-site` of function

To understand `this`, we have to understand the call-site. Call-site is the location in code where a function is called (not where it's declared). Finding the call-site is generally go locate where a function is called from, it's not always easy, a complex codebase and high function call stack can obscure the true call-site.

Let's demonstrate call-site in code.

```js
function baz() {
  console.log('baz');
  bar(); // <-- call-site for bar
}

function bar() {
  console.log('bar');
  foo(); // <-- call-site for foo
}

function foo() {
  console.log('foo');
}

baz(); // <-- call-site for baz
```

## Fortunately, we have rules to determine!

- ### Explicit Binding

As the name said, this case is quite simple and clear, we specify the `this` explicitly on function invocation.
All functions in Javascript can access some methods from their `Prototype` to invoke with a specific `this` object (or context).

For instance, the `Function.prototype.call(...)` and `Function.prototype.apply(...)` both take, as their first parameter, an object to use for the `this` and then invoke the function with that `this` specified.

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
foo.apply(obj); // 2
```

Another method `Function.prototype.bind(thisArg)` allow us to bind `this` of current function to a specified context. It returns a new function with hard-binding `this`. We can call it many times without rebinding `this` context. Technically, it behaves like a decorated function.

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
var bar = foo.bind(obj);

bar(); // 2
```

- ### Implicit Binding

In Javascript, object can have a property linked to a function. So from an object perspective, it can access and point to function, then call it normally. On this case, the call-site of the invoked function is the object it belongs to. So `this` context inside function will reference to parent object.

Let's see!

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo,
};

obj.foo(); // 2
```

- ### Default Binding

This rule comes from the most common case of function calls: standalone function invocation.
Consider this code!

```js
function foo() {
  console.log(this.a);
}

var a = 2;
foo(); // 2
```

Variable `a` is declared in the global scope and synonymous with global-object properties of the same name. We see that when `foo()` function is called, `this.a` resolves to our global variable `a`. In other words, `this` is pointed to global object.

If `strict mode` is in effect, the global object is not eligible for the default binding, so the `this` instead set to `undefined`

```js
function foo() {
  'use strict';
  console.log(this.a);
}

var a = 2;
foo(); // TypeError: `this` is `undefined`
```

- ### `new` Binding

When a function invoked with `new` in front of it, the following things are done automatically:

- a brand new object is created
- the newly constructed object is et as the `this` binding for that function call
- unless function return its own alternate object, the `new`-invoked function call will automatically return the newly constructed object

Consider this code!

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

By calling `foo(...)` with `new` in front of it, we have constructed a new object and set that new object as `this` for the call of `foo(...)`. It's called `new` binding.

## What about precedence?

TBD

## There are always special cases

As usual, there are some exceptions to the "rules"!

- ### Ignored `this`

If you pass nullish value like `null` or `undefined` as a `this` binding parameter to `call`, `apply` or `bind`, those values are totally ignored by the engine. On this case, `Default Binding` will apply to the invocation.

For example.

```js
function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```

- ### Arrow-functions

Arrow-function is signified not by the `function` keyword, but by the `=>` annotation. Instead of using these rules, arrow-functions adopt the `this` binding from the enclosing function or global scope.

Let see!

```js
function foo() {
  return (a) => {
    // `this` here is lexically adopted from `foo()`
    console.log(this.a);
  };
}

var obj1 = {
  a: 2,
};

var obj2 = {
  a: 3,
};

var bar = foo.call(obj1);
bar.call(obj2); // 2, not 3!
```

The arrow-function created in `foo()` lexically captures whatever `foo()`'s `this` is its call-time. Because `foo()` was `this`-bound to `obj1`, `bar` will also be `this`-bound to `obj1`. And importantly, the lexical binding of an arrow function can not be overridden (event with `new`).
Developer commonly use this kind of binding in arrow-function to handle events timers.

## Conclusion

Determining the `this` binding for an executing function requires finding the direct call-site of that function. Then, four rules can be applied to the call-site with precedence:

- Called with `new` -> Use the newly constructed object.
- Called with `call`, `apply` or `bind` -> Use the specified object.
- Called with a context object owning the call? Use that context object.
- Default -> `undefined` in `strict mode`, otherwise global object

Be aware of some exceptions such as `Ignored "this"` and `Arrow function` when determining also.

Happy tracing!
