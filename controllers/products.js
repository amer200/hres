const fs = require('fs').promises;
const Prod = require("../models/product");
exports.add = async (req, res) => {
    try {
        const img = req.file;
        const name = req.body.name;
        const desc = req.body.desc;
        const newProd = new Prod({
            img: img.path,
            name: name,
            desc: desc
        })
        await newProd.save()
        return res.status(200).json({
            msg: "ok",
            data: newProd
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getAll = async (req, res) => {
    try {
        const Prods = await Prod.find()
        res.status(200).json({
            msg: "ok",
            data: Prods
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getById = async (req, res) => {
    try {
        const pId = req.params.pId;
        const prod = await Prod.findById(pId)
        return res.status(200).json({
            msg: "ok",
            data: prod
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.edit = async (req, res) => {
    try {
        const pId = req.body.pId;
        const name = req.body.name;
        const desc = req.body.desc;
        const img = req.file;
        const prod = await Prod.findById(pId);
        await fs.unlink(prod.img);
        prod.img = img.path
        prod.name = name
        prod.desc = desc
        await prod.save()
        return res.status(200).json({
            msg: "ok",
            data: prod
        })
    } catch (error) {
        console.log(error);
    }
}
exports.delete = async (req, res) => {
    try {
        const pId = req.params.pId;
        const prod = await Prod.findById(pId);
        await fs.unlink(prod.img);
        await Prod.findByIdAndDelete(pId);
        return res.status(200).json({
            msg: "ok"
        })
    } catch (error) {
        console.log(error.message);
    }
}