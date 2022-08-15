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

console.log(spots);

// making new reservations as an object
let newReservations = [];
reservations.forEach((reservations) => {
  newReservations.push({
    _id: reservations.id,
    month: reservations.month,
    spot: reservations.spot,
    firstname: reservations.firstname,
    lastname: reservations.lastname,
    email: reservations.email,
    zipcode: reservations.zipcode,
  });
});

console.log(reservations);

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
