const express = require('express');
const route = express.Router();
const offerController = require("../controllers/offer");
route.post("/add", offerController.add);
route.get("/get-all", offerController.getAll);
route.get("/get-by-id/:oId", offerController.getById);
route.put("/edit", offerController.edit);
route.delete("/delete/:oId", offerController.delete);
module.exports = route