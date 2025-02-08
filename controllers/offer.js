const fs = require('fs').promises;
const Offer = require("../models/offer");

exports.add = async (req, res) => {
    try {
        const img = req.file;
        const newOffer = new Offer({
            img: img.path
        })
        await newOffer.save()
        return res.status(200).json({
            msg: "ok",
            data: newOffer
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getAll = async (req, res) => {
    try {
        const offers = await Offer.find()
        res.status(200).json({
            msg: "ok",
            data: offers
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.getById = async (req, res) => {
    try {
        const oId = req.params.oId;
        const offer = await Offer.findById(oId)
        return res.status(200).json({
            msg: "ok",
            data: offer
        })
    } catch (error) {
        console.log(error.message);
    }
}
exports.edit = async (req, res) => {
    try {
        const oId = req.body.oId;
        const img = req.file;
        const offer = await Offer.findById(oId);
        await fs.unlink(offer.img);
        offer.img = img.path
        await offer.save()
        return res.status(200).json({
            msg: "ok",
            data: offer
        })
    } catch (error) {
        console.log(error);
    }
}
exports.delete = async (req, res) => {
    try {
        const oId = req.params.oId;
        const offer = await Offer.findById(oId);
        await fs.unlink(offer.img);
        await Offer.findByIdAndDelete(oId);
        return res.status(200).json({
            msg: "ok"
        })
    } catch (error) {
        console.log(error.message);
    }
}