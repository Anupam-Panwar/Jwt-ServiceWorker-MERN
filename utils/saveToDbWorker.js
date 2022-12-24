const { parentPort } = require('worker_threads');
const csvtojson = require("csvtojson");
const Contact = require("../models/contact");

require("../database/connection");

const saveToDb = async(csvData) =>{
    let contacts;
    await csvtojson().fromString(csvData).then(json => {
        contacts = json;
    });

    contacts.forEach(async contact => {
        // console.log("Over here", contact)
        let newContact = new Contact({
            name : contact["name"],
            phone : contact["phone"],
            email : contact["email"],
            linkedin_profile_url : contact["linkedin_profile_url"]
        })
        console.log(newContact)
        try{
            const contactDB = await newContact.save();
            console.log(contactDB);
        } catch (err){
            console.log("Error saving this contact in Database ", err, contact)
        }
    });
}

parentPort.on("message", (csvData) =>{
    saveToDb(csvData);
})

