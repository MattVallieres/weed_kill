// fetching data component
const { spots, reservations } = require('./data/everything');
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// making new spots as an object
let newSpots = {
  _id: Object.keys(spots).toString(),
  month: Object.keys(spots).toString(),
  spots: Object.values(spots.August),
};

console.log(newSpots);

// making new reservations as an object
let newReservations = [];
reservations.forEach((reservation) => {
  newReservations.push({
    _id: reservation.id,
    month: reservation.month,
    spot: reservation.spot,
    firstname: reservation.firstname,
    lastname: reservation.lastname,
    email: reservation.email,
    zipcode: reservation.zipcode,
  });
});

console.log(newReservations);

// for our spots
const spotImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db('final-project');
  const result = await db.collection('spots').insertOne(newSpots);
  if (result) {
    console.log("Success!");
  } else {
    console.log("Error!");
  };
  client.close();
};

// for our reservations
const reservationsImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db('final-project');
  const result = await db.collection("reservations").insertMany(newReservations);
  if (result) {
    console.log("Success!");
  } else {
    console.log("Error!");
  };
  client.close();
};

spotImport();
reservationsImport();
