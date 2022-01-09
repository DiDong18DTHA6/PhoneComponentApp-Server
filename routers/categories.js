const router = require("express").Router();
const Categories = require("../models/Categories");

//GET
router.get("/", async (req, res) => {
  try {
    // const Category = new Categories();
    // Category.categoryName = "Trang Chủ";
    // Category.image = "https://cdn-icons-png.flaticon.com/512/25/25694.png"
    // Category.code = 1;
    // const saveList = await Category.save();

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
