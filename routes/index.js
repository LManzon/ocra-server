const router = require("express").Router();
const authRoutes = require("./auth");
const profileRouter = require("./profile");
const Objectives = require("./Objectives");

router.get("/", (req, res, next) => {
    res.json("All good in here");
});



router.use("/auth", authRoutes);

router.use("/profile", profileRouter);
router.use("/objectives", Objectives);



module.exports = router;
