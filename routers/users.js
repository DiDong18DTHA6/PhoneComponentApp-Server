const router = require("express").Router();
const Users = require("../models/Users");
var CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {
  try {
    let name = req.body.name ? req.body.name : "";
    let email = req.body.email ? req.body.email : "";
    let pass = req.body.pass;
    let ciphertext = CryptoJS.AES.encrypt(
      pass,
      process.env.SECRET_KEY
    ).toString();

    const user = new Users({
      name: name,
      email: email,
      pass: ciphertext,
    });

    const check = await user.save();

    if (check) {
      let data = {
        success: true,
        message: "Đăng kí thành công",
      };
      res.status(200).json(data);
    } else {
      let data = {
        success: false,
        message: "Đăng kí thất bại",
      };
      res.status(200).json(data);
    }
  } catch (err) {
    let data = {
      success: false,
      message: "Đăng kí thất bại",
    };
    res.status(200).json(data);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      let data = {
        success: false,
        message: "Đăng nhập thất bại",
      };
      res.status(200).json(data);
    } else {
      const bytes = CryptoJS.AES.decrypt(user.pass, process.env.SECRET_KEY);
      const decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (decryptedPass != req.body.pass) {
        let data = {
          success: false,
          message: "sai mật khẩu đăng nhập",
        };

        res.status(200).json(data);
      } else {
        let data = {
          success: true,
          message: "Đăng nhập thành công",
          result: []
        };
        const { pass, ...info } = user._doc;
        data.result.push(info);
        res.status(200).json(data);
      }
    }
  } catch (err) {
    console.log(err);
    let data = {
      success: false,
      message: "Đăng nhập thất bại",
    };
    res.status(200).json(data);
  }
});

module.exports = router;
