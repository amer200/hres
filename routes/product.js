const express = require('express');
const route = express.Router();
const prodController = require("../controllers/products");
const isAdmin = require("../middlewares/admin").isAuth;

route.post("/add", isAdmin, prodController.add);
route.get("/get-all", prodController.getAll);
route.get("/get-by-id/:pId", prodController.getById);
route.put("/edit", isAdmin, prodController.edit);
route.get("/delete/:pId", isAdmin, prodController.delete);
module.exports = route