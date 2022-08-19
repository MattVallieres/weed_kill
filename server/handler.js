const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data/everything");

// returns a list of all months
const getMonths = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");
  const result = await db.collection("spots").find().toArray();
  console.log(result);

  result
    ? res.status(200).json({ status: 200, data: result.map((x) => x._id), message: "all months" })
    : res.status(404).json({ status: 404, data: result, message: "not found" });
    client.close();
};

// returns a specified month
const getMonth = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  // old code from Q
  // const { spots } = req.params;
  const db = client.db("final-project");
  const spot = req.params.month;
  // old code from Q
  // const clients = await db.collection("spots").findOne({ _id: ObjectId(spots) });
  const result = await db.collection("spots").findOne({ spot });
  console.log(result);

  result.spots
    ? res.status(200).json({ status: 200, data: result.spots, message: "month found"  })
    : res.status(404).json({ status: 404, data: result.spots, message: "not found" });
    client.close();
  // old code from Q 
  // response
  // if (clients) {
  //     res.status(200).json({ status: 200, data: clients });
  // } else {
  //     res.status(404).json({ status: 404, message: "No clients were found" });
  // }
};

// returns a list of all reservations
const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("final-project");
  const result = await db.collection("reservations").find().toArray(); 
// toArray(); is not a function, howcome?
    result
    ? res.status(200).json({ status: 200, data: result, message: "all reservations" })
    : res.status(404).json({ status: 404, message: "no found" });
    client.close();
};

// returns a single reservation
  const getReservation = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const _id = req.params.reservation;
    console.log(req.param.reservation);
    const db = client.db("final-project");
    const result = await db.collection("reservations").find({_id: ObjectId(_id)}).toArray();

        result
        ? res.status(200).json({ status: 200, data: result, message: "was found"})
        : res.status(404).json({ status: 404, data: result, message: "not found" })
        client.close();
};

// post users information
const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const query = { spot: req.body.spot };
    const find = await db.collection("reservations").findOne(query)
    if (!find) {
      const newReservation = { ...req.body, id: uuidv4() }
      const result = await db.collection("reservations").insertOne(newReservation);
      await db.collection("spots").updateOne({ _id: req.body.month, "spots.spot": req.body.spot }, { $set: { "spots.$.isAvailable": false }});

      if (result) {
        res.status(201).json({status: 201, reservation: { ...result, id: newReservation.id }, message: "reservation was made" });
      }
    } else {
      res.status(400).json({ status: 400, message: "not made" });
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: "error" });
    }
    client.close();
    console.log("disconnected");
  };
    // try {
    //     await client.connect();
    //     const db = client.db("final-project");
    //     const query = { spot: req.body.spot };
    //     const find = await db.collection("reservations").findOne(query);
    //         if (!find) {
    //     const newRes = { ...req.body, id: uuidv4() };
    //     const result = await db.collection("reservations").insertOne(newRes);
    //     await db.collection("spots").updateOne({ _id: req.body.month, "spots.spot": req.body.spot },
    //         { $set: { "spots.$.isAvailable": false }}
    //       );
    //     if (result) {
    //       res.status(201).json({status: 201,
    //         reservation: { ...result, id: newRes.id },
    //         message: "Reservation was made!",
    //       });
    //     }
    //   } else {
    //     res.status(400).json({ status: 400, message: "Spot not available!" });
    //   }
    // } catch (err) {
    //   res.status(500).json({ status: 500, message: "Ya... something ain't right" });
    // }
    // client.close();
// ----------------------------------- ⭐ PATCH: update reservations ⭐ -----------------------------------------
const updateReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {firstname , lastname, email, zipcode, id} = req.body;

  await client.connect();
  const db = client.db("final-project");
  // const result = await db.collection("reservations").findOne({id})
  // console.log(result)

  const changeInfo = await db.collection("reservations").updateOne({id}, {$set: {firstname: firstname, lastname: lastname, email: email, zipcode: zipcode}})
  console.log(changeInfo)
  res.status(200).json({status: 200, message: "hello", data: changeInfo})
  // const finalResult = await db.collection("reservations").updateOne(query, {
  //   $set: {
  //     flight: flight,
  //     seat: seat,
  //     givenName: givenName,
  //     surName: surName,
  //     email: email,
  //   },
  // });

//   const result = await db.collection("reservations").findOneAndUpdate({ _id: result.value._id, firstname: result.value._id },
//   {$set: { "spots.$.isAvailable": true }}, { returnNewDocument: true });
//   console.log(result.value);
//   if(result.value){
//     res.status(200).json({status: 200, message: "Successfully deleted the reservation"})
//   } else {
//     res.status(404).json({status: 404, message: "Oops! Reservation could not be deleted"})
// }
client.close();
  // const month = req.body.month;
  // const spotId = req.body.spot;
  // const id = req.body.id;
  // const reservationQuery = {id};
}
  // try {
  //   await client.connect();
  //   const db = client.db("final-project");
  //   const spotsInfo = await db.collection("spots").findOne({ month });

  //   const findReservation = await db.collection("reservations").findOne(reservationQuery);
  //   console.log(findReservation);
    
  //   if (findReservation.spots !== spotId) {
  //     const findSpot = spotsInfo.spots.find((spots) => spots.spot === spotId);
  //     if (!findSpot.isAvailable) {
  //       res.status(404).json({ status: 404, message: "Spot is not available!" });
  //       return;
  //     }
  //     findSpot.isAvailable = false;
  //     const oldSpot = spotsInfo.spots.find((spot) => spot.id === findReservation.spot);
  //     oldSpot.isAvailable = true;
  //     await db.collection("spots").updateOne({ _id: req.body.month }, { $set: { ...spotsInfo } });
  //   }

  //   const findUpdate = await db.collection("reservations").updateOne({ id: req.body.id }, { $set: { ...req.body } });
  //     res.status(200).json({status: 200, data: findUpdate ,message: "success!"});
  //   } catch (err) {
  //     res.status(500).json({ status: 500, message: "Ya... something aint right" });
  //   }
  //   client.close();
  // };
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
  getMonths,
  getMonth,
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
};

