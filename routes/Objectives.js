const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Objective = require("../models/Objectives.model");
const router = Router();

router.post("/edit", isLoggedIn, (req, res) => {
  console.log(req.body);
  const {
    problem,
    category,
    objectiveInput,
    keyResult,
    objectiveEndDate,
    visibility,
    objectiveId,
  } = req.body;

  console.log(req.body);

  Objective.findByIdAndUpdate(
    objectiveId,
    {
      problem,
      objectiveInput,
      keyResult,
      objectiveEndDate,
      category,
      visibility,
    },
    { new: true }
  ).then((updateObjective) => {
    console.log("UPDATED OBJECT", updateObjective);
    res.json({ Objective: updateObjective });
  });
});

router.get("/", isLoggedIn, (req, res) => {
  console.log("user:", req.user);
  const userId = req.user._id;
  Objective.find({ user: userId })
    .populate("action")
    .then((allObjectives) => {
      res.json(allObjectives);
      console.log("allObj:", allObjectives);
      // const date = allObjectives.map((e) => {
      //   return { ...allObjectives.filter() };
      // });

      //
    });
});

router.post("/delete", isLoggedIn, (req, res) => {
  const objId = req.body.objectiveId;

  console.log("objtoDelete:", objId);
  Objective.findByIdAndDelete(objId).then((deleteObjective) => {
    res.json({ objective: deleteObjective });
  });
});

router.post("/add", isLoggedIn, (req, res) => {
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
        action,
        visibility,
      } = req.body;
      // console.log("visibility:", visibility);
      // console.log('action:', action)
      // console.log("category:", category);
      console.log("date:", objectiveEndDate);

      Objective.create({
        problem,
        objectiveInput,
        keyResult,
        objectiveEndDate,
        category,
        action,
        visibility,
        user: req.user.id,
      })
        .then((createdObjective) => {
          // Action.create({
          //   action
          // })
          console.log("createdObjective:", createdObjective);
          res.json({ objective: createdObjective });
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
