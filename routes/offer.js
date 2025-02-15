const express = require('express');
const route = express.Router();
const offerController = require("../controllers/offer");
const isAdmin = require("../middlewares/admin").isAuth;
route.post("/add", isAdmin, offerController.add);
route.get("/get-all", offerController.getAll);
route.get("/get-by-id/:oId", offerController.getById);
route.put("/edit", isAdmin, offerController.edit);
route.get("/delete/:oId", isAdmin, offerController.delete);
module.exports = route