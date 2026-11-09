# IRP LMS & JavaScript Foundations Assignment

This repository contains the complete practical implementation for the **Responsive Web Design & JavaScript Foundations** assignment, organized into **Part A (Frontend CSS Responsiveness)** and **Part B (JavaScript Bank Account Simulator)**.

---

## 📁 Repository Directory Structure

```text
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html          # Semantic HTML5 recreation of IRP LMS Home Page
│   ├── courses.html        # Video tutorial course directory
│   ├── contact.html        # Student support & contact message form
│   └── style.css           # Responsive CSS3 (Flexbox, CSS Grid, CSS Positioning)
├── part-b-javascript/
│   └── bank.js             # Standalone JavaScript file (Part 1 & Part 2)
└── README.md               # Setup notes, testing steps, and execution instructions
```

---

## 🎨 Part A: Frontend CSS Responsiveness (IRP LMS)

### Features & Implementation
- **Top Sticky Navigation Bar:** Anchored at the top using CSS positioning (`position: sticky; top: 0; z-index: 1000;`) ensuring page content scrolls underneath smoothly.
- **Desktop Layout ($\ge 1024\text{px}$):**
  - Full navigation menu with active orange indicator on current page.
  - 2-column hero banner featuring headline copy on the left and official illustration on the right.
  - Learning Journey section formatted into an exact **5-column horizontal grid** (`grid-template-columns: repeat(5, 1fr)`).
- **Tablet Layout ($768\text{px} - 1024\text{px}$):**
  - Step cards wrap into a balanced multi-column grid (`grid-template-columns: repeat(3, minmax(0, 1fr))`).
- **Mobile Layout ($\le 768\text{px}$):**
  - Desktop nav links collapse/hide per specification.
  - Header retains the brand logo on the left and outlined "Sign In" button on the right with comfortable touch targets.
  - Hero banner stacks into a clean vertical stream without horizontal overflow.
  - Step cards stack into a **strict 1-column layout** (`grid-template-columns: 1fr`) with numbers aligned on the top-left.
- **Design Tokens:** Exact hex codes implemented via CSS variables:
  - `--color-primary-navy: #003366`
  - `--color-primary-orange: #FE781E`
  - `--color-secondary-blue: #5F9FE0`
  - `--color-bg-light: #E2F2FD`
  - `--color-card-bg: #FFFFFF`
  - `--color-border-light: #D6E9FF`

### Testing Part A in Google Chrome
1. Navigate to the `part-a-responsive-ui/` folder.
2. Double-click [`index.html`](file:///part-a-responsive-ui/index.html) or open it in Google Chrome.
3. **Scroll Test:** Scroll down the page and verify that the navbar remains anchored to the top of the viewport.
4. **Responsive DevTools Test:**
   - Press `F12` (or right-click and choose **Inspect**).
   - Click the **Toggle device toolbar** icon (`Ctrl + Shift + M`).
   - Test at **Desktop ($\ge 1200\text{px}$)**: Verify step cards display in 5 columns and full nav links are visible.
   - Test at **Tablet ($768\text{px} - 1024\text{px}$)**: Verify cards wrap into 3 columns.
   - Test at **Mobile ($375\text{px} / 390px$)**: Verify nav links are hidden, top bar shows brand + Sign In, and step cards stack vertically in 1 column without horizontal scrolling.

---

## ⚡ Part B: JavaScript Bank Account Simulator (`bank.js`)

Part B diagnoses and fixes data type and variable scope defects in a banking simulation script using modern ECMAScript standards (`"use strict";`, strict equality `===`/`!==`).

### Core Concepts Demonstrated
1. **Part 1 — Types & Coercion (`parseAmount`):**
   - Validates user input through 7 sequential guards:
     1. Guards against `null` and `undefined`.
     2. Validates type (rejects anything that is not `string` or `number`).
     3. Trims whitespace for strings (`.trim()`).
     4. Guards against empty string `""` (preventing implicit coercion to `0`).
     5. Converts with `Number()` and rejects `NaN` values.
     6. Validates that the amount is strictly positive ($> 0$).
     7. Returns the verified numeric value.
   - All tests invoked inside `try/catch` without console logging inside `parseAmount`.
   - Theoretical comments documenting why `"5" + 2 === "52"` while `"5" - 2 === 3`, and why `typeof null === "object"`.

2. **Part 2 — Scoping, Hoisting & Temporal Dead Zone:**
   - **Step 1:** Immutability with `const BANK_NAME` vs mutable state with `let transactionCounter`.
   - **Step 2 (Hoisting Demo):**
     - Hoisting of `var` variable (evaluates to `undefined`).
     - Demonstrating the **Temporal Dead Zone (TDZ)** with `let` catching a `ReferenceError`.
     - Calling function declaration before definition (succeeds via hoisting).
     - Calling function expression `var notify = function()` before assignment (catches `TypeError`).
     - Execution Context Creation Phase vs Execution Phase documentation.
   - **Step 3 (The Asynchronous Loop Bug):**
     - Demonstrates the classic closure bug with `var` inside `setTimeout` logging `3, 3, 3`.
     - Demonstrates per-iteration lexical binding fix using `let` logging `0, 1, 2`.

### Running Part B in Terminal
Run the script using Node.js from the project root:

```bash
node part-b-javascript/bank.js
```

**Expected Output:**
```text
=== PART 1: Types & Coercion ===
Testing parseAmount(input) with required test cases:

[Test 1] Input: "500" -> Success: 500 (type: number)
[Test 2] Input: " 250 " -> Success: 250 (type: number)
[Test 3] Input: "" -> Caught Error: Invalid input: empty string cannot be converted to a deposit amount.
[Test 4] Input: "abc" -> Caught Error: Invalid number: "abc" contains non-numeric characters.
[Test 5] Input: null -> Caught Error: Amount is required: value cannot be null or undefined.
[Test 6] Input: undefined -> Caught Error: Amount is required: value cannot be null or undefined.
[Test 7] Input: "12.5.3" -> Caught Error: Invalid number: "12.5.3" contains non-numeric characters.

=== PART 2: Scoping & Hoisting ===
Bank: "JS National Bank" | Initial Transactions: 0

1. var hoisting check before declaration: undefined
2. Caught TDZ ReferenceError with let: ReferenceError: Cannot access 'tdzVariable' before initialization
3. Function Declaration Hoisting: announce() successfully called before definition line!
4. Caught Function Expression TypeError: TypeError: notify is not a function

--- Step 3: The Asynchronous Loop Bug ---
var loop: 3
var loop: 3
var loop: 3
let loop: 0
let loop: 1
let loop: 2
```

---

## 🚀 GitHub Submission Checklist
1. Create a **public** repository on GitHub.
2. Initialize git and commit all project files:
   ```bash
   git init
   git add .
   git commit -m "Complete IRP LMS responsive web design and JS bank simulator assignment"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
   git push -u origin main
   ```
3. Open your repository URL in an **Incognito / Private browser window** to verify public accessibility.
4. Submit the repository link to the assignment submission portal.
