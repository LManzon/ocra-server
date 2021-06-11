const router = require("express").Router();
const authRoutes = require("./auth");
const profileRouter = require("./profile");
// const Objectives = require("./Objectives");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "ocra-final-project",
//   },
// });

// const upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  res.json("All good in here");
});






router.use("/auth", authRoutes);
router.use("/profile", profileRouter);
// router.use("/objectives", Objectives);


module.exports = router;
