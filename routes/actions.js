const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Objective = require("../models/Objectives.model");
const Action = require("../models/Action.model");
const router = Router();

router.post("/edit", isLoggedIn, (req, res) => {
  console.log(req.user);
  const { action, status } = req.body;

  console.log(req.body);

  Action.findByIdAndUpdate(
    ActionId,
    {
      action,
      status,
    },
    { new: true }
  ).then((updateAction) => {
    res.json({ action: updateAction });
  });
});

// router.get("/", (req, res) => {
//   Objective.find({}).then((allObjectives) => {
//     res.json(allObjectives);
//     console.log(allObjectives);
//   });
// });

router.post("/add", isLoggedIn, (req, res) => {
  Action.findOne({
    action: req.body.action,
  })
    .then((oneAction) => {
      if (oneAction) {
        return res.status(400).json({
          errorMessage:
            "This problem already exists. Create a slightly different one",
          key: "problem",
        });
      }

      const { action } = req.body;

      console.log("action:", action);

      Action.create({
        action,
      })
        .then((createdAction) => {
          console.log("createdObjective:", createdAction);
          res.json({ Action: createdAction });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ errorMessage: err.message });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
