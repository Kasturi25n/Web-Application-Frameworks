/**
 * Question 4: NodeJS and MongoDB Online Shopping (MongoDB native driver)
 *
 * Database: ShoppingDB, Collection: products
 * Document: { productId, productName, category, price, stock }
 *
 * Run: node Question-04/onlineShopping.js   (or: npm run q4)
 *
 * Student: Pushpam Raj Satyarthi
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    // 1. Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const products = client.db('ShoppingDB').collection('products');
    await products.deleteMany({}); // start fresh so the program can be re-run

    // 2. Insert four product records
    const insertResult = await products.insertMany([
      { productId: 'P101', productName: 'Laptop', category: 'Electronics', price: 55000, stock: 12 },
      { productId: 'P102', productName: 'Headphones', category: 'Electronics', price: 2500, stock: 30 },
      { productId: 'P103', productName: 'T-Shirt', category: 'Clothing', price: 799, stock: 8 },
      { productId: 'P104', productName: 'Coffee Mug', category: 'Home', price: 350, stock: 5 }
    ]);
    console.log(`\nInserted ${insertResult.insertedCount} products`);

    // 3. Retrieve products with stock greater than 10
    const inStock = await products.find({ stock: { $gt: 10 } }).toArray();
    console.log('\n--- Products with stock greater than 10 ---');
    console.table(inStock, ['productId', 'productName', 'category', 'price', 'stock']);

    // 4. Update the price of product P102
    const updateResult = await products.updateOne({ productId: 'P102' }, { $set: { price: 1999 } });
    console.log(`\nUpdated P102: ${updateResult.modifiedCount} document(s) modified`);

    // 5. Delete product P103
    const deleteResult = await products.deleteOne({ productId: 'P103' });
    console.log(`Deleted P103: ${deleteResult.deletedCount} document(s) removed`);

    // 6. Display the remaining products
    const remaining = await products.find().toArray();
    console.log('\n--- Remaining Products ---');
    console.table(remaining, ['productId', 'productName', 'category', 'price', 'stock']);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main();
