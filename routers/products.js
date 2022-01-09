const router = require("express").Router();
const Products = require("../models/Products");
const querySring  = require("querystring");

//GET
router.get("/news", async (req, res) => {
  try {
    // const Product = new Products();
    // Product.productName = "Điện thoại iPhone 13 Pro";
    // Product.image =
    //   "https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-sierra-blue-600x600.jpg";
    // Product.price = 2000000;
    // Product.description =
    //   "Chip: Intel Core i5-7200U RAM: DDR4 4GB (2 khe cắm) Ổ cứng: HDD 1TB Chipset đồ họa: Intel HD Graphics 620 Màn hình: 15.6 Inches Hệ điều hành: Free Dos";
    // Product.category = 1;

    // const saveList = await Product.save();
    // console.log(saveList);

    const products = await Products.find().sort({ At: -1 });
    let data = {
      success: true,
      message: "thành công",
      result: products,
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let loai = req.body.category ? req.body.category : 1;
    let page = req.body.page ? Math.max(0, req.body.page) : 0;
    let perPage = 20;
    const products = await Products.find({ category: loai })
      .limit(perPage)
      .skip(perPage * page);
    let data = {
      success: true,
      message: "thành công",
      result: products,
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
