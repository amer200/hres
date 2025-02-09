const express = require('express');
const route = express.Router();
const servController = require("../controllers/service");
route.post("/add", servController.add);
route.get("/get-all", servController.getAll);
route.get("/get-by-id/:sId", servController.getById);
route.put("/edit", servController.edit);
route.delete("/delete/:sId", servController.delete);
module.exports = route