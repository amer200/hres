const mongoose = require("mongoose");

const servSchema = new mongoose.Schema({
    serv: String,
    img: String
});
module.exports = mongoose.model('Serv', servSchema);