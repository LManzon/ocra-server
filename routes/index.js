const router = require("express").Router();
const authRoutes = require("./auth");
const objectives = require ("./Objectives")

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

router.use("/auth", authRoutes);

router.use("/objectives", objectives);


module.exports = router;
