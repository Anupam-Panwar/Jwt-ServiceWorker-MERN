const  mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    linkedin_profile_url :{
        type: String,
        required: true,
        default: ""
    }
});

module.exports = mongoose.model('contact', contactSchema);