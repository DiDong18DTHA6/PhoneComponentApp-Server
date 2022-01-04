const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");


require("dotenv").config();

const app = express();
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api/category", categoriesRouter);
app.use("/api/products", productsRouter);
// app.use("/api/movies", moviesRouter);
// app.use("/api/lists", listsRouter);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
