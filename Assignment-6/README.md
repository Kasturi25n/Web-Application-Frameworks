# Assignment 6: Web Application Framework

**Course:** Web Application Framework  
**Student Name:** Pushpam Raj Satyarthi  
**Roll Number:** 2024107717  
**Department / Branch:** CSE-Core  

---

## 📌 Overview

MongoDB shell commands and NodeJS + MongoDB (native driver) programs.

| # | Question | Technology | File | Command |
|---|---|---|---|---|
| 1 | Movie Ticket Management | MongoDB Shell | `Question-01/movies.js` | `npm run q1` |
| 2 | Sports Equipment Management | MongoDB Shell | `Question-02/equipment.js` | `npm run q2` |
| 3 | Bus Reservation (TransportDB) | NodeJS + MongoDB | `Question-03/busReservation.js` | `npm run q3` |
| 4 | Online Shopping (ShoppingDB) | NodeJS + MongoDB driver | `Question-04/onlineShopping.js` | `npm run q4` |

---

## 🚀 How to Run

1. Start a MongoDB server on `mongodb://127.0.0.1:27017` (e.g. `brew services start mongodb-community`).
2. Install dependencies:
   ```bash
   cd Assignment-6
   npm install
   ```
3. Run any question with the command in the table above.

Questions 1 and 2 need `mongosh` installed. You can also paste their commands into a mongosh session one by one
(use `use MovieDB` / `use SportsDB` instead of the `getSiblingDB` line).

To use a different server, set `MONGO_URI`, e.g. `MONGO_URI=mongodb://host:27017 npm run q3`.

Every script clears its collection first, so it can be run again and give the same output.

---

## 📋 Operations Covered

**Q1 – movies** (`MovieDB`): `insertMany` five movies → `find()` all → `find({ price: { $lt: 250 } })` → `updateOne` tickets of M102 → `deleteOne` M103.

**Q2 – equipment** (`SportsDB`): `insertMany` four items → `find()` all → `find({ sport: "Cricket" })` → `updateOne` quantity of E102 → `deleteOne` E103.

**Q3 – buses** (`TransportDB`): connect → insert three buses → `availableSeats > 20` → update seats of B102 → delete B103 → show final records.

**Q4 – products** (`ShoppingDB`): connect → insert four products → `stock > 10` → update price of P102 → delete P103 → show remaining products.
