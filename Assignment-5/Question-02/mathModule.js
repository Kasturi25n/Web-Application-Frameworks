/**
 * Question 2: Custom Math Module
 * 
 * Contains functions to add and multiply two numbers.
 * Exported using module.exports.
 */

// Function to add two numbers
function add(num1, num2) {
  return Number(num1) + Number(num2);
}

// Function to multiply two numbers
function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

// Export the functions as a module
module.exports = {
  add,
  multiply
};
