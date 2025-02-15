const jwt = require("jsonwebtoken");
// exports.isAuth = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(400).json({
//             msg: "token is requires"
//         })
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//         console.log(user)
//         if (err) {
//             return res.status(400).json({
//                 msg: err
//             })
//         }
//         if (user.data.user.rolle == 'admin') {
//             req.user = user.data
//             next();
//         } else {
//             res.status(405).json({
//                 msg: "not allowed"
//             })
//         }
//     })
// }

exports.isAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect("/admin/log-in");

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.redirect("/admin/log-in");
        req.user = decoded; // حفظ بيانات المستخدم في الطلب
        next();
    });
};