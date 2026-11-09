"use strict";

// ============================================================================
// PART 1: Types & Coercion
// ============================================================================

/**
 * Validates a raw value typed by a user and returns a verified positive number.
 * Throws informative Errors upon invalid input, never logging to console directly.
 *
 * @param {*} input - Raw input from deposit / transaction entry
 * @returns {number} - Verified positive number
 * @throws {Error} - Descriptive error explaining validation failure
 */
function parseAmount(input) {
  // 1. Guard against missing values: null or undefined
  if (input === null || input === undefined) {
    throw new Error("Amount is required: value cannot be null or undefined.");
  }

  // 2. Type check: reject anything that is neither string nor number
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error(`Invalid type: amount must be a string or number, received ${typeof input}.`);
  }

  // 3. Remove outer spaces if input is a string
  let processed = typeof input === "string" ? input.trim() : input;

  // 4. Guard against empty string (which Number("") would coerce to 0)
  if (typeof processed === "string" && processed === "") {
    throw new Error("Invalid input: empty string cannot be converted to a deposit amount.");
  }

  // 5. Convert using Number() and guard against non-numeric NaN values
  const converted = Number(processed);
  if (Number.isNaN(converted)) {
    throw new Error(`Invalid number: "${input}" contains non-numeric characters.`);
  }

  // 6. Ensure the amount is strictly greater than zero (positive value check)
  if (converted <= 0) {
    throw new Error(`Invalid amount: value must be greater than zero, received ${converted}.`);
  }

  // 7. Return verified number
  return converted;
}

// ----------------------------------------------------------------------------
// Testing: parseAmount called inside try/catch blocks for all required inputs
// ----------------------------------------------------------------------------
console.log("=== PART 1: Types & Coercion ===");
console.log("Testing parseAmount(input) with required test cases:\n");

const testCases = [
  { value: "500", expected: "Returns number 500" },
  { value: " 250 ", expected: "Returns number 250" },
  { value: "", expected: "Throws Error" },
  { value: "abc", expected: "Throws Error" },
  { value: null, expected: "Throws Error" },
  { value: undefined, expected: "Throws Error" },
  { value: "12.5.3", expected: "Throws Error" }
];

testCases.forEach((tc, index) => {
  try {
    const result = parseAmount(tc.value);
    console.log(`[Test ${index + 1}] Input: ${JSON.stringify(tc.value)} -> Success: ${result} (type: ${typeof result})`);
  } catch (err) {
    console.log(`[Test ${index + 1}] Input: ${JSON.stringify(tc.value)} -> Caught Error: ${err.message}`);
  }
});

// ----------------------------------------------------------------------------
// Mandatory Comments:
// 1. Why "5" + 2 gives "52" while "5" - 2 gives 3:
//    - The addition operator (+) is overloaded in JavaScript: when one operand is a string,
//      JavaScript applies string concatenation, coercing number 2 into "2", producing "52".
//    - The subtraction operator (-) has no string overload: JavaScript triggers numeric coercion,
//      converting the string "5" into the number 5, resulting in 5 - 2 = 3.
// 2. Why typeof null === "object":
//    - In the original 1995 JavaScript implementation, values were represented with a type tag
//      in their lower bits. The type tag for "object" was 000. Because null represented the
//      NULL pointer (0x00 / all zeros), its type tag was also 000. Hence typeof null returned
//      "object". This bug was retained in ECMAScript to avoid breaking legacy web code.
// ----------------------------------------------------------------------------


// ============================================================================
// PART 2: Scoping & Hoisting
// ============================================================================

// ----------------------------------------------------------------------------
// Step 1: Main Declarations
// ----------------------------------------------------------------------------
// const is used for BANK_NAME because the bank identity is immutable and never re-assigned.
const BANK_NAME = "JS National Bank";

// let is used for transactionCounter because it tracks state and increments over time.
let transactionCounter = 0;

console.log("\n=== PART 2: Scoping & Hoisting ===");
console.log(`Bank: "${BANK_NAME}" | Initial Transactions: ${transactionCounter}\n`);


// ----------------------------------------------------------------------------
// Step 2: Hoisting Demo
// // HOISTING DEMO
// ----------------------------------------------------------------------------

// 1. var: Printed before its declaration line; outputs "undefined" because var is
// hoisted during creation phase and automatically initialized with undefined.
console.log("1. var hoisting check before declaration:", hoistedVar);
var hoistedVar = "Standard Account Service";

// 2. let: Printed before declaration inside try/catch; caught ReferenceError demonstrates
// the Temporal Dead Zone (TDZ). The variable is in scope but remains uninitialized.
try {
  console.log("2. let TDZ check before declaration:", tdzVariable);
} catch (error) {
  console.log(`2. Caught TDZ ReferenceError with let: ${error.name}: ${error.message}`);
}
let tdzVariable = "High Yield Account Service";

// 3. Function Declaration: Called before its definition line; succeeds because
// the function name and its complete body are fully hoisted into memory during creation phase.
announce();
function announce() {
  console.log("3. Function Declaration Hoisting: announce() successfully called before definition line!");
}

// 4. Function Expression: Called before definition line inside try/catch; throws TypeError
// because notify is declared as a var and is currently undefined (not a callable function).
try {
  notify();
} catch (error) {
  console.log(`4. Caught Function Expression TypeError: ${error.name}: ${error.message}`);
}
var notify = function () {
  console.log("Notification: Transfer processed.");
};

// 5. Execution Context Creation vs. Execution Phases:
//    - Creation Phase: The JS engine allocates memory for identifiers. Function declarations are
//      fully defined; var variables are initialized to undefined; let and const identifiers are
//      registered in lexical scope but remain in the Temporal Dead Zone (uninitialized).
//    - Execution Phase: The JS engine executes statements line by line, evaluating expressions
//      and assigning actual values when declaration lines are reached.


// ----------------------------------------------------------------------------
// Step 3: The Asynchronous Loop Bug
// ----------------------------------------------------------------------------
console.log("\n--- Step 3: The Asynchronous Loop Bug ---");

// 1. var loop: var shares a single function/global scoped binding across all iterations.
// By the time the event loop executes the queued setTimeout callbacks, the loop has completed
// and i equals 3. Therefore, it logs "3, 3, 3".
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 50);
}

// 2. let loop: let is block-scoped. Each loop iteration establishes a fresh lexical binding
// for j, closing over its distinct iteration value (0, 1, 2) inside the setTimeout callback.
for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log("let loop:", j);
  }, 100);
}

// 3. Scoping Explanation:
//    var shares a single function/global scoped variable across all iterations, whereas let creates
//    a fresh lexical binding per iteration, preserving each iteration's unique index for asynchronous callbacks.
