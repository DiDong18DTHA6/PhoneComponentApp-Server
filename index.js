const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const formidable = require("express-formidable");

require("dotenv").config();

const app = express();

//Connect Mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connecting Successfull");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.multipart());

//routes
app.use("/api/category", categoriesRouter);
app.use("/api/products", productsRouter);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
