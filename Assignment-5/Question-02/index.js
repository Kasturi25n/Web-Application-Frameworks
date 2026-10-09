/**
 * Question 2: NodeJS Modules and File Handling
 * 
 * Requirements:
 * - Creates a custom module containing functions to add and multiply two numbers.
 * - Imports the module into the main program.
 * - Accepts two numbers and displays their sum and product.
 * - Demonstrates the use of require().
 * - Demonstrates File Handling using NodeJS built-in 'fs' module.
 * 
 * Student: Pushpam Raj Satyarthi
 */

// Import custom module using require()
const math = require('./mathModule');

// Import built-in fs and path modules for file handling
const fs = require('fs');
const path = require('path');

// Accept two numbers from command-line arguments, or default to 25 and 15
const num1 = process.argv[2] !== undefined ? parseFloat(process.argv[2]) : 25;
const num2 = process.argv[3] !== undefined ? parseFloat(process.argv[3]) : 15;

console.log('==================================================');
console.log('  NodeJS Modules and File Handling Demonstration  ');
console.log('==================================================');
console.log(`Accepted Numbers:`);
console.log(`  Number 1: ${num1}`);
console.log(`  Number 2: ${num2}\n`);

// Perform calculations using functions from the imported module
const sum = math.add(num1, num2);
const product = math.multiply(num1, num2);

console.log('Calculations using Custom Module:');
console.log(`  Sum (${num1} + ${num2})       = ${sum}`);
console.log(`  Product (${num1} * ${num2})   = ${product}\n`);

// File Handling Demonstration:
// 1. Write the results into a file
const filePath = path.join(__dirname, 'calculation_output.txt');
const logContent = `--- Calculation Log ---
Date & Time: ${new Date().toISOString()}
Number 1: ${num1}
Number 2: ${num2}
Sum: ${sum}
Product: ${product}
-----------------------
`;

try {
  fs.writeFileSync(filePath, logContent, 'utf-8');
  console.log(`[File Handling] Successfully wrote calculation result to: ${filePath}`);

  // 2. Read the file back using fs.readFileSync to verify
  const readData = fs.readFileSync(filePath, 'utf-8');
  console.log('[File Handling] Content read back from file:');
  console.log(readData);
} catch (error) {
  console.error('[File Handling Error]:', error.message);
}

module.exports = { num1, num2, sum, product };
