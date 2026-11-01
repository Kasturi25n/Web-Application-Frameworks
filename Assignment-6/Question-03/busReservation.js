/**
 * Question 3: NodeJS and MongoDB Bus Reservation
 *
 * Database: TransportDB, Collection: buses
 * Document: { busNo, route, totalSeats, availableSeats }
 *
 * Run: node Question-03/busReservation.js   (or: npm run q3)
 *
 * Student: Pushpam Raj Satyarthi
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    // 1. Establish a MongoDB connection
    await client.connect();
    console.log('Connected to MongoDB');

    const buses = client.db('TransportDB').collection('buses');
    await buses.deleteMany({}); // start fresh so the program can be re-run

    // 2. Insert three bus records
    const insertResult = await buses.insertMany([
      { busNo: 'B101', route: 'Delhi - Agra', totalSeats: 40, availableSeats: 25 },
      { busNo: 'B102', route: 'Mumbai - Pune', totalSeats: 35, availableSeats: 10 },
      { busNo: 'B103', route: 'Bangalore - Mysore', totalSeats: 45, availableSeats: 30 }
    ]);
    console.log(`\nInserted ${insertResult.insertedCount} buses`);

    // 3. Retrieve buses having more than 20 available seats
    const freeBuses = await buses.find({ availableSeats: { $gt: 20 } }).toArray();
    console.log('\n--- Buses with more than 20 available seats ---');
    console.table(freeBuses, ['busNo', 'route', 'totalSeats', 'availableSeats']);

    // 4. Update the available seats of bus B102
    const updateResult = await buses.updateOne({ busNo: 'B102' }, { $set: { availableSeats: 5 } });
    console.log(`\nUpdated B102: ${updateResult.modifiedCount} document(s) modified`);

    // 5. Delete bus B103
    const deleteResult = await buses.deleteOne({ busNo: 'B103' });
    console.log(`Deleted B103: ${deleteResult.deletedCount} document(s) removed`);

    // 6. Display the final records
    const finalBuses = await buses.find().toArray();
    console.log('\n--- Final Bus Records ---');
    console.table(finalBuses, ['busNo', 'route', 'totalSeats', 'availableSeats']);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main();
