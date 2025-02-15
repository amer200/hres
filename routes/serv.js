const express = require('express');
const route = express.Router();
const servController = require("../controllers/service");
const isAdmin = require("../middlewares/admin").isAuth;

route.post("/add", isAdmin, servController.add);
route.get("/get-all", servController.getAll);
route.get("/get-by-id/:sId", servController.getById);
route.put("/edit", isAdmin, servController.edit);
route.get("/delete/:sId", isAdmin, servController.delete);
module.exports = route