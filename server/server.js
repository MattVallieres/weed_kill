const express = require("express");
const PORT = 8000;

// hello why are you not in my commit?!

express()
  .get("/", (req, res) => {
    res.status(200).json({status: 200, message: "Hello World!"});
  })

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
