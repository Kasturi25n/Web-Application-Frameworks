/**
 * Question 1: Movie Ticket Management (MongoDB Shell Commands)
 *
 * Collection: movies -> { movieId, title, genre, tickets, price }
 *
 * Run: mongosh Question-01/movies.js
 *
 * Student: Pushpam Raj Satyarthi
 */

db = db.getSiblingDB("MovieDB");
db.movies.drop(); // start fresh so the script can be re-run

// 1. Insert five movie records
db.movies.insertMany([
  { movieId: "M101", title: "Inception", genre: "Sci-Fi", tickets: 120, price: 300 },
  { movieId: "M102", title: "3 Idiots", genre: "Comedy", tickets: 80, price: 200 },
  { movieId: "M103", title: "The Dark Knight", genre: "Action", tickets: 150, price: 350 },
  { movieId: "M104", title: "Dangal", genre: "Drama", tickets: 90, price: 220 },
  { movieId: "M105", title: "Coco", genre: "Animation", tickets: 60, price: 180 }
]);

// 2. Display all movies
print("\n--- All Movies ---");
printjson(db.movies.find().toArray());

// 3. Find movies having ticket price less than 250
print("\n--- Movies with price < 250 ---");
printjson(db.movies.find({ price: { $lt: 250 } }).toArray());

// 4. Update the ticket count of movie M102
db.movies.updateOne({ movieId: "M102" }, { $set: { tickets: 100 } });
print("\n--- After updating tickets of M102 ---");
printjson(db.movies.findOne({ movieId: "M102" }));

// 5. Delete movie M103
db.movies.deleteOne({ movieId: "M103" });
print("\n--- After deleting M103 ---");
printjson(db.movies.find().toArray());
