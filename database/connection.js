const mongoose = require("mongoose");

// MongoDB Atlas Connection
mongoose.set('strictQuery', true);
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to MongoDB");
  }
);
