const jwt = require("jsonwebtoken");
const Prod = require("../models/product");
const Serv = require("../models/service");
const Offer = require("../models/offer");

exports.getIndex = async (req, res) => {
    try {
        const Prods = await Prod.find()
        res.render("admin/products/products", {
            prods: Prods
        });
    } catch (error) {
        console.log(error.message);
    }
}
exports.getServ = async (req, res) => {
    try {
        const servs = await Serv.find()
        res.render("admin/serv/serv", {
            servs: servs
        });
    } catch (error) {
        console.log(error.message);
    }
}
exports.getOffer = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.render("admin/offers/offer", {
            offers: offers
        });
    } catch (error) {
        console.log(error.message);
    }
}
exports.getLogin = (req, res) => {
    res.render("admin/login");
}

exports.logIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + "//" + password)
    console.log(process.env.ADMINEMAIL + "//" + process.env.ADMINPASSWORD)
    if (email == process.env.ADMINEMAIL && password == process.env.ADMINPASSWORD) {
        const u = {
            id: "1",
            name: "admin",
            rolle: "admin"
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: { user: u },
        }, process.env.ACCESS_TOKEN);
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect("/admin");
        // return res.status(200).json({
        //     msg: "ok",
        //     token: token
        // })
    } else {
        return res.status(404).json({
            msg: "email or password is wrong",
        });
    }
}
exports.logOut = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/admin");
};