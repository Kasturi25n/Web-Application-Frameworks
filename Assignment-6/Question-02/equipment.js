/**
 * Question 2: Sports Equipment Management (MongoDB Shell Commands)
 *
 * Collection: equipment -> { equipmentId, name, sport, quantity, available }
 *
 * Run: mongosh Question-02/equipment.js
 *
 * Student: Pushpam Raj Satyarthi
 */

db = db.getSiblingDB("SportsDB");
db.equipment.drop(); // start fresh so the script can be re-run

// 1. Insert four equipment records
db.equipment.insertMany([
  { equipmentId: "E101", name: "Cricket Bat", sport: "Cricket", quantity: 15, available: true },
  { equipmentId: "E102", name: "Football", sport: "Football", quantity: 20, available: true },
  { equipmentId: "E103", name: "Tennis Racket", sport: "Tennis", quantity: 8, available: false },
  { equipmentId: "E104", name: "Cricket Helmet", sport: "Cricket", quantity: 10, available: true }
]);

// 2. Display all equipment
print("\n--- All Equipment ---");
printjson(db.equipment.find().toArray());

// 3. Find equipment belonging to the Cricket sport
print("\n--- Cricket Equipment ---");
printjson(db.equipment.find({ sport: "Cricket" }).toArray());

// 4. Update the quantity of equipment E102
db.equipment.updateOne({ equipmentId: "E102" }, { $set: { quantity: 25 } });
print("\n--- After updating quantity of E102 ---");
printjson(db.equipment.findOne({ equipmentId: "E102" }));

// 5. Delete equipment E103
db.equipment.deleteOne({ equipmentId: "E103" });
print("\n--- After deleting E103 ---");
printjson(db.equipment.find().toArray());
