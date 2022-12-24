const express = require("express");
const app = express();

const cors = require("cors");
const { Worker } = require('worker_threads');


const dotenv = require("dotenv");
dotenv.config();

const upload = require("express-fileupload");

app.use(cors());
app.use(upload());
app.use(express.json());

const port = process.env.PORT;
require("./database/connection");

const saveContactsToDbWorker = new Worker("./utils/saveToDbWorker.js");

// Middleware to print the request details
app.use((req, res, next) => {
    console.log(" -> Request received  <- ");
    console.log(port+ " -- " + req.url + " --  " + req.method);
    next();
  });

// Route to process the request related to JWT
app.use("/token", require("./controllers/jwt"));

app.post("/save-contacts", async (req, res)=>{
    let  csvData = req.files.contactFile.data.toString('utf8');
    saveContactsToDbWorker.postMessage(csvData);
    res.json({
        "message": "Successfully placed your request"
    })
})

app.listen(port, (err) => {
    if (err) 
      console.log("Error in starting server");
    else 
        console.log(`Server Started at ${port}`);
})