const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// ---------------------------🍁 These are for the month endpoints 🍁----------------------------------
// ---------------- ⭐ GET all of the months and their spots (August is the only one) ⭐ --------------
const getAllMonth = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("spots").find().toArray();
    console.log(result);

    result
    ? res.status(200).json({ status: 200, data: result, message: "Look at that! All the months are there" })
    : res.status(404).json({ status: 404, data: result, message: "That's sad, no spots where found" });
    client.close();
};
// -------------------------------------------------------------------------------------------------------
// ----------------- ⭐ GET a specific month and their month (August is the only one) ⭐ ---------------
const getSpecificMonth = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    // old code from Q
    // const { spots } = req.params;
    const db = client.db("final-project");
    // old code from Q
    // const clients = await db.collection("spots").findOne({ _id: ObjectId(spots) });
    const _id = req.params.month;
    const result = await db.collection("spots").findOne({ _id });
    console.log(result);

    result
    ? res.status(200).json({ status: 200, data: result.spots, message: "Look at that! Specific month is there!"  })
    : res.status(404).json({ status: 404, data: result.spots, message: "That's sad, didn't find a specific month" });
    client.close();
};
    // old code from Q 
    // response
    // if (clients) {
    //     res.status(200).json({ status: 200, data: clients });
    // } else {
    //     res.status(404).json({ status: 404, message: "No clients were found" });
    // }
// ------------------------------------------------------------------------------------------------------------
// --------------------------- 🐻 These are endpoints for reservation  🐻 ------------------------------------
// -------------⭐ GET all reservations info (The person for this example is the only one) ⭐-----------------
const getAllReservations = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("reservations").findOne();
    // toArray(); is not a function, howcome?

    result
    ? res.status(200).json({ status: 200,  reservations: result })
    : res.status(404).json({ status: 404, message: "Sorry but not reservations found" });
    client.close();
};
// -------------⭐ GET: Get a specific reservation info (The person for this example is the only one) ⭐-----------------
    const getSpecificReservations = async(req, res) => {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const _id = req.params.reservation;
        console.log(req.param.reservations);
        const db = client.db("final-project");
        const result = await db.collection("reservations").find({_id: ObjectId(_id)}).toArray();

        result
        ? res.status(200).json({ status: 200, data: result, message: "was found"})
        : res.status(404).json({ status: 404, data: result, message: "not Found" })
        client.close();
};
// ----------------------------------- ⭐ POST: Add a new reservations ⭐ -----------------------------------------
const addReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("final-project");
        const query = { spot: req.body.spot };
        const find = await db.collection("reservations").findOne(query);
            if (!find) {
        const newRes = { ...req.body, id: uuidv4() };
        const result = await db.collection("reservations").insertOne(newRes);
        await db.collection("spots").updateOne({ _id: req.body.month, "spots.spot": req.body.spot },
            { $set: { "spots.$.isAvailable": false }}
          );
        if (result) {
          res.status(201).json({status: 201,
            reservation: { ...result, id: newRes.id },
            message: "Reservation was made!",
          });
        }
      } else {
        res.status(400).json({ status: 400, message: "Spot not available!" });
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: "Ya... something ain't right" });
    }
    client.close();
  };
// ----------------------------------- ⭐ PATCH: update reservations ⭐ -----------------------------------------
const updateReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const month = req.body.month;
  const spotId = req.body.spot;
  const id = req.body.id;
  const reservationQuery = {id};

  try {
    await client.connect();
    const db = client.db("final-project");
    const spotsInfo = await db.collection("spots").findOne({ month });

    const findReservation = await db.collection("reservations").findOne(reservationQuery);
    console.log(findReservation);
    
    if (findReservation.spots !== spotId) {
      const findSpot = spotsInfo.spots.find((spots) => spots.spot === spotId);
      if (!findSpot.isAvailable) {
        res.status(404).json({ status: 404, message: "Spot is not available!" });
        return;
      }
      findSpot.isAvailable = false;
      const oldSpot = spotsInfo.spots.find(
        (spot) => spot.id === findReservation.spot
      );
      oldSpot.isAvailable = true;
      await db.collection("spots").updateOne({ _id: req.body.month }, { $set: { ...spotsInfo } });
    }

    const findUpdate = await db.collection("reservations").updateOne({ id: req.body.id }, { $set: { ...req.body } });
      res.status(200).json({status: 200, data: findUpdate ,message: "success!"});
    } catch (err) {
      res.status(500).json({ status: 500, message: "Ya... something aint right" });
    }
    client.close();
  };
// ----------------------------------- ⭐ DELETE: Delete a reservation ⭐ -----------------------------------------
const deleteReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const _id = req.params.reservation;
    const result = await db.collection("reservations").findOneAndDelete({_id: ObjectId(_id)});
    console.log(result.value);
    if (result.value) {
      await db
        .collection("spots")
        .updateOne({ month: result.value.month, "spots.spot": result.value.spot }, { $set: { "spots.$.isAvailable": true } });
      res.status(200).json({status: 200, data: result.value, message: "you deleted your reservation!"});
    } else {
      res.status(400).json({ status: 400, id, message: "no reservation found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
  client.close();
};
// ------------------------------------------------------------------------------------------------------------

module.exports = {
    getAllMonth,
    getSpecificMonth,
    getAllReservations,
    getSpecificReservations,
    addReservation,
    updateReservation,
    deleteReservation,
};
