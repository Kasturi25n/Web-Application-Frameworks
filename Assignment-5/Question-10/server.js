/**
 * Question 10: Mini REST API: Product Management
 * 
 * Requirements:
 * - Complete Product Management REST API using NodeJS and ExpressJS.
 * - GET /products → Retrieve all products.
 * - GET /products/:id → Retrieve a product by ID.
 * - POST /products → Add a product.
 * - PUT /products/:id → Update a product.
 * - DELETE /products/:id → Delete a product.
 * - Use JSON request/response handling and appropriate HTTP status codes.
 * 
 * Student: Pushpam Raj Satyarthi
 */

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5007;

// JSON Middleware
app.use(express.json());

// In-memory products store
let products = [
  { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 199.99, stock: 45 },
  { id: 2, name: 'Mechanical Gaming Keyboard', category: 'Accessories', price: 89.50, stock: 30 },
  { id: 3, name: 'Ultra-Wide 34-Inch Curved Monitor', category: 'Displays', price: 499.00, stock: 12 },
  { id: 4, name: 'Ergonomic Desk Chair', category: 'Furniture', price: 249.99, stock: 18 }
];

let nextId = 5;

// 1. GET /products → Retrieve all products
app.get('/products', (req, res) => {
  res.status(200).json({
    success: true,
    total: products.length,
    data: products
  });
});

// 2. GET /products/:id → Retrieve a product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Product with ID ${req.params.id} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// 3. POST /products → Add a product
app.post('/products', (req, res) => {
  const { name, category, price, stock } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Product name and price are required fields.'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    category: category || 'General',
    price: parseFloat(price),
    stock: stock !== undefined ? parseInt(stock, 10) : 0
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data: newProduct
  });
});

// 4. PUT /products/:id → Update a product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Product with ID ${req.params.id} does not exist.`
    });
  }

  const { name, category, price, stock } = req.body;

  if (name !== undefined) products[index].name = name;
  if (category !== undefined) products[index].category = category;
  if (price !== undefined) products[index].price = parseFloat(price);
  if (stock !== undefined) products[index].stock = parseInt(stock, 10);

  res.status(200).json({
    success: true,
    message: `Product with ID ${id} updated successfully.`,
    data: products[index]
  });
});

// 5. DELETE /products/:id → Delete a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Product with ID ${req.params.id} does not exist.`
    });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Product '${deletedProduct.name}' (ID: ${id}) deleted successfully.`,
    data: deletedProduct
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found.`
  });
});

app.listen(PORT, () => {
  console.log(`[Q10] Product Management REST API is running on http://localhost:${PORT}`);
  console.log(`  - GET    http://localhost:${PORT}/products`);
  console.log(`  - GET    http://localhost:${PORT}/products/1`);
  console.log(`  - POST   http://localhost:${PORT}/products`);
  console.log(`  - PUT    http://localhost:${PORT}/products/1`);
  console.log(`  - DELETE http://localhost:${PORT}/products/1`);
});

module.exports = app;
