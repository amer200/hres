const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    img: String
});
module.exports = mongoose.model('Offer', offerSchema);