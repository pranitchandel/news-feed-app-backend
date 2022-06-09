const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/health", (req, res) => res.json({ msg: "users api is working" }));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    console.log(user);
    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log("i am here");
      if (isMatch) {
        const payload = { id: user._id, name: user.name };

        jwt.sign(
          payload,
          process.env.SECRETKEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ msg: "Password incorrect" });
      }
    });
  } catch (err) {
    return res.status(500).json("Server error");
  }
});

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    contactNumber,
    gender,
    language,
    maritalStatus,
    dateOfBirth,
    timeOfBirth,
  } = req.body;
  try {
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) {
      user.name = name;
      user.email = email;
      user.passport = password;
      user.contactNumber = contactNumber;
      user.gender = gender;
      user.language = language;
      user.maritalStatus = maritalStatus;
      user.dateOfBirth = dateOfBirth;
      user.timeOfBirth = timeOfBirth;
    } else {
      user = new User({
        name,
        email,
        password,
        contactNumber,
        gender,
        language,
        maritalStatus,
        dateOfBirth,
        timeOfBirth,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      console.log("Am i here " + user);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.json({ msg: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
