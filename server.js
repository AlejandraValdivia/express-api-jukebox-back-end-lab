require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./controllers/tracks");
const connectToDatabase = require("./connection");
const app = express();
const PORT = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());
connectToDatabase();


app.use("/tracks", trackRoutes);


// 404 error handler
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
