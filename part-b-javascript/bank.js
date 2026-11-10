
"use strict";

// PART 1: Types & Coercion

function parseAmount(input) {
    // Check if the amount is missing
    if (input === null || input === undefined) {
        throw new Error("Amount is required.");
    }

    // Accept only strings and numbers
    if (typeof input !== "string" && typeof input !== "number") {
        throw new Error("Invalid input type.");
    }

    // Remove extra spaces from string input
    let value = typeof input === "string" ? input.trim() : input;

    // Check for empty input
    if (value === "") {
        throw new Error("Amount cannot be empty.");
    }

    // Convert the input into a number
    const amount = Number(value);

    // Check if the input is a valid number
    if (Number.isNaN(amount)) {
        throw new Error("Please enter a valid number.");
    }

    // Amount must be greater than zero
    if (amount <= 0) {
        throw new Error("Amount must be greater than zero.");
    }

    return amount;
}

// Test parseAmount with different inputs
console.log("=== PART 1: Types & Coercion ===");

const testCases = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

testCases.forEach((input, index) => {
    try {
        const result = parseAmount(input);
        console.log(`[Test ${index + 1}] Input: ${JSON.stringify(input)} -> Success: ${result} (type: ${typeof result})`);
    } catch (error) {
        console.log(`[Test ${index + 1}] Input: ${JSON.stringify(input)} -> Caught Error: ${error.message}`);
    }
});

// + joins strings, but - converts strings into numbers.
console.log('"5" + 2 =', "5" + 2);
console.log('"5" - 2 =', "5" - 2);

// typeof null returns "object" due to a historical JavaScript behavior.
console.log("typeof null =", typeof null);


// PART 2: Scoping & Hoisting

// const is used because the bank name does not change.
const BANK_NAME = "JS National Bank";

// let is used because the transaction count can change.
let transactionCounter = 0;

console.log("\n=== PART 2: Scoping & Hoisting ===");
console.log(`Bank: "${BANK_NAME}" | Initial Transactions: ${transactionCounter}`);

// HOISTING DEMO

// var is hoisted and initialized with undefined.
console.log("1. var hoisting check before declaration:", hoistedVar);
var hoistedVar = "Standard Account Service";

// let cannot be accessed before its declaration (TDZ).
try {
    console.log("2. let TDZ check before declaration:", tdzVariable);
} catch (error) {
    console.log(`2. Caught TDZ ReferenceError with let: ${error.name}: ${error.message}`);
}
let tdzVariable = "High Yield Account Service";

// Function declarations can be called before their definition.
announce();

function announce() {
    console.log("3. Function Declaration Hoisting: announce() successfully called before definition line!");
}

// A function expression stored in var is undefined before assignment.
try {
    notify();
} catch (error) {
    console.log(`4. Caught Function Expression TypeError: ${error.name}: ${error.message}`);
}

var notify = function () {
    console.log("Notification: Transfer processed.");
};

// During creation, JavaScript prepares declarations.
// During execution, it runs the code and assigns values.


// Step 3: The Asynchronous Loop Bug

console.log("\n--- Step 3: The Asynchronous Loop Bug ---");

// var shares one variable, so all callbacks print 3.
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("var loop:", i);
    }, 50);
}

// let creates a separate variable for each iteration.
for (let j = 0; j < 3; j++) {
    setTimeout(function () {
        console.log("let loop:", j);
    }, 100);
}

// var shares one value, while let keeps a separate value for each iteration.
