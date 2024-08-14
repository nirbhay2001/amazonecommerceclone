require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db/conn.js");
const Products = require("./models/productsSchema.js");
const DefaultData = require("./defaultdata.js");
const cors = require("cors");
const router = require("./routes/router.js");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

connectDB();


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`your server is running on port ${port} `);
});

// DefaultData();
