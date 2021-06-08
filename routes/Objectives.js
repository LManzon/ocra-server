const { Router } = require("express")
const isLoggedIn = require("../middleware/isLoggedIn")
const Objective = require("../models/Objectives.model")
const router = Router();


router.get("/", (req, res) => {
  Objective.find({}).then((allObjectives) => {
    res.json(allObjectives);
    console.log(allObjectives)
  });
});

router.post("/add", isLoggedIn, (req, res) => {

  Objective.findOne({
    problem: req.body.problem,
  })
    .then((oneProblem) => {
      if (oneProblem) {
        return res
          .status(400)
          .json({ errorMessage: "This problem already exists. Create a slightly different one", key: "problem" });
      }

      const { problem, objectiveInput, keyResult, objectiveEndDate, category, visibility, sharedWithUser } =
        req.body;
      console.log('action:', action)
      console.log('category:', category)

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
          console.log('createdObjective:', createdObjective)
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
