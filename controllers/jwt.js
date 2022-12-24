const express = require("express");
const jwt = require('jsonwebtoken'); 
const route = express.Router();
const user = require("../models/user");

// Generate Token API
route.post("/generate", (req, res) => {
   
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const {userName, password} = req.body;
    if(!userName || !password)
    {
        return res.status(422).json({ error: "Enter the details properly" });
    }
    let data = {
        time: Date(),
        userName: userName,
        password: password
    }
    //console.log(userName);
    user.findOne({userName: userName}, function (err, docs) {
        if (!docs){
            res.send({error: "Not a valid user"});
        }
        else{
            //console.log(docs);
            if(docs.password === password)
            {
                const token = jwt.sign(data, jwtSecretKey);
                res.send(token);
            }
            else{
                res.json({error: "Not a valid user(WP)"});
            }
        }
    });  
});

// Validate Token API
route.get("/validate", (req, res) => {

	let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	try {
		const token = req.header(tokenHeaderKey);
		const verified = jwt.verify(token, jwtSecretKey);
		if(verified)
			return res.json(verified);
        else
			return res.status(401).send(error);
	} catch (error) {
		return res.status(401).send(error);
	}
});

module.exports = route;