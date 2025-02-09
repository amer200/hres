const fs = require('fs').promises;
const Serv = require("../models/service");
exports.add = async (req, res) => {
    try {
        const img = req.file;
        const serv = req.body.serv;
        const newServ = new Serv({
            img: img.path,
            serv: serv
        })
        await newServ.save()
        return res.status(200).json({
            msg: "ok",
            data: newServ
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getAll = async (req, res) => {
    try {
        const servs = await Serv.find()
        res.status(200).json({
            msg: "ok",
            data: servs
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getById = async (req, res) => {
    try {
        const sId = req.params.sId;
        const serv = await Serv.findById(sId)
        return res.status(200).json({
            msg: "ok",
            data: serv
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.edit = async (req, res) => {
    try {
        const sId = req.body.sId;
        const servName = req.body.serv;
        const img = req.file;
        const serv = await Serv.findById(sId);
        await fs.unlink(serv.img);
        serv.img = img.path
        serv.serv = servName
        await serv.save()
        return res.status(200).json({
            msg: "ok",
            data: serv
        })
    } catch (error) {
        console.log(error);
    }
}
exports.delete = async (req, res) => {
    try {
        const sId = req.params.sId;
        const serv = await Serv.findById(sId);
        await fs.unlink(serv.img);
        await Serv.findByIdAndDelete(sId);
        return res.status(200).json({
            msg: "ok"
        })
    } catch (error) {
        console.log(error.message);
    }
}