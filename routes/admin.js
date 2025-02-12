const express = require('express');
const route = express.Router();
const adminController = require("../controllers/admin");

route.post("/log-in", adminController.logIn)
module.exports = route