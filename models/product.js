const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String
});
module.exports = mongoose.model('Prod', prodSchema);