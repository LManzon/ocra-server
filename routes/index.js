const router = require("express").Router();
const authRoutes = require("./auth");
const profileRouter = require("./profile");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/profile", profileRouter);

module.exports = router;
