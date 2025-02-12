const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: ".env" });
const { dbConnection } = require("./db/mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

///////////////////////////////////////////
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//////////////////////////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage });
app.post('/offer/add', upload.single('img'));
app.put('/offer/edit', upload.single('img'));
app.post('/service/add', upload.single('img'));
app.put('/service/edit', upload.single('img'));
app.post('/prod/add', upload.single('img'));
app.put('/prod/edit', upload.single('img'));

//////////////////////////////////////////
//routes
const offerRoute = require("./routes/offer");
const servRoute = require("./routes/serv");
const prodRoute = require("./routes/product");
const adminRoute = require("./routes/admin");
app.use("/offer", offerRoute);
app.use("/service", servRoute);
app.use("/prod", prodRoute);
app.use("/admin", adminRoute);
//db onnection
dbConnection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});