const router = require("express").Router();
const Categories = require("../models/Categories");

//GET
router.get("/", async (req, res) => {
  try {
    // const Category = new Categories();
    // Category.categoryName = "Iphone";
    // Category.image = "https://phucanhcdn.com/media/product/40799_iphone_12_pro_max_silver_ha1.jpg"
    // const saveList = await Category.save();
    // console.log(saveList);
    const categories = await Categories.find();
    let data = {
      success: true,
      message: "thành công",
      result: categories
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
