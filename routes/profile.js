const router = require("express").Router();
const User = require("../models/User.model");
const isloggedIn = require("../middleware/isLoggedIn");

router.put("/update", isloggedIn, (req, res) => {
  const { name, surname, email } = req.body;

  User.find({ email }).then((allUsers) => {
    const allnotMe = allUsers.filter(
      (e) => e._id.toString() !== req.user._id.toString()
    );
    if (allnotMe.length) {
    }

    User.findByIdAndUpdate(
      req.user._id,
      { name, surname, email },
      { new: true }
    ).then((updateUser) => {
      res.json({ user: updateUser });
    });
  });
});

module.exports = router;
