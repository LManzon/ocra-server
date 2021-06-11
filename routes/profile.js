const router = require("express").Router();
const User = require("../models/User.model");
const isloggedIn = require("../middleware/isLoggedIn");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Objective = require("../models/Objectives.model");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ocra-final-project",
  },
});

const upload = multer({ storage: storage });

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

router.post(
  "/updatePicture",
  upload.single("profilePic"),
  isloggedIn,
  (req, res) => {
    const profilePic = req.file.path;
    const id = req.user._id;

    User.findByIdAndUpdate(id, { profilePic })
      .then(() => {
        res.json({ picFromServer: profilePic });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.post("/addObjective", isloggedIn, (res, req) => {
  Objective.findOne({
    problem: req.body.problem,
  })
    .then((oneProblem) => {
      if (oneProblem) {
        return res.status(400).json({
          errorMessage:
            "This problem already exists. Create a slightly different one",
          key: "problem",
        });
      }

      const {
        problem,
        objectiveInput,
        keyResult,
        objectiveEndDate,
        category,
        visibility,
        sharedWithUser,
      } = req.body;
      console.log("action:", action);
      console.log("category:", category);

      Objective.create({
        problem,
        objectiveInput,
        keyResult,
        objectiveEndDate,
        category,
        visibility,
        sharedWithUser,
      })
        .then((createdObjective) => {
          console.log("createdObjective:", createdObjective);
          res.json({ Objective: "Objective created" });
        })
        .catch((err) => {
          console.log(err.message);
          res.json(500).json({ errorMessage: err.message });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
