const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Objective = require("../models/Objectives.model");
const Action = require("../models/Action.model");
const router = Router();

router.post("/edit", isLoggedIn, (req, res) => {
  console.log(req.user);
  const { action, status } = req.body;

  console.log("wewe:", req.body);
  const ActionId = req.body.actionId;

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

router.post("/add", isLoggedIn, (req, res) => {
  console.log("ActionCreated:", req.body);
  const objId = req.body.objectiveId;

  // Objective.findOne({
  //   objId,
  // })
  //   .populate("action")
  //   .then((oneAction) => {
  //     console.log("result", oneAction);
  //     if (oneAction) {
  //       return res.status(400).json({
  //         errorMessage:
  //           "This problem already exists. Create a slightly different one",
  //         key: "problem",
  //       });
  //     }

  const action = req.body.action;
  const status = req.body.status;
  const objectiveId = req.body.objectiveId;

  console.log("action:", action);

  Action.create({
    action,
    status,
  })
    .then((createdAction) => {
      console.log("createdAction:", createdAction);
      console.log("ObjectiveID:", objectiveId);
      console.log("ActionId:", createdAction._id);
      Objective.findByIdAndUpdate(
        objectiveId,
        {
          $push: { action: createdAction._id },
        },
        { new: true }
      )
        .populate("action")
        .then((objUpdate) => {
          console.log("objUpdate:", objUpdate);
          res.json({ objective: objUpdate });
        });
    })

    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ errorMessage: err.message });
    });
});
// .catch((err) => {
//   console.log(err.message);
//   res.status(500).json({ errorMessage: err.message });
// });
// });

router.post("/delete", isLoggedIn, (req, res) => {
  console.log("delete Action:", req.body);
  const actionId = req.body.actionId;

  console.log("actionDelete:", actionId);
  Action.findByIdAndDelete(actionId).then((deleteAction) => {
    res.json({ action: deleteAction });
  });
});

module.exports = router;