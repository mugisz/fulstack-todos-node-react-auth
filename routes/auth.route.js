const { Router } = require("express");
const User = require("../model/Users");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = Router();
const jwtToken = require("jsonwebtoken");

router.post(
  "/registration",
  [
    check("email", "Bad Email").isEmail(),
    check("password", "Bad Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({
          erorrs: err.array(),
          message: "Некоректні дані регістрації",
        });
      }

      const { email, password } = req.body;
      const isUsed = await User.findOne({ email });
      if (isUsed) {
        return res
          .status(400)
          .json({ message: "Даний емеіл зайнятий спробуйте інший" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
      const user = new User({
        email,
        password: hashedPass,
      });

      await user.save();

      res.status(201).json({ message: "Користувач створений" });
    } catch (error) {
      console.log("auth: " + error);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Bad Email").isEmail(),
    check("password", "Bad Password").exists(),
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({
          erorrs: err.array(),
          message: "Некоректні дані регістрації",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Takogo email net v baze" });

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Parol ne virnuy" });

      const jwtSecret = "cmwcoiwemiowekopfeweeqkofk1092k32cvew";
      const token = jwtToken.sign(
        {
          userId: user.id,
        },

        jwtSecret,
        { expiresIn: "1h" }
      );
      res.json({ token, userId: user.id });
    } catch (e) {
      console.log("auth: " + e);
    }
  }
);
module.exports = router;
