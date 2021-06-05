const { Schema, model } = require("mongoose");

const objectivesSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Career", "Passion", "Relationship", "Financial", "Wellbeing"],
    required: true,
  },

  objectiveInput: {
    type: String,
    required: true,
  },

  objectiveEndDate: {
    type: Date,
    required: true,
  },

  keyResult: {
    type: String,
    required: true,
  },


  user: { type: Schema.Types.ObjectId, ref: "User" },

  buddy: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },

  status: {
    type: String,
    enum: ["Not Started", "In-Progress", "Completed"],
    default: "Not Started",
  },

  visibility: {
    type: String,
    enum: ["Public", "Private", "Friends"],
    default: "Private",
  },

  sharedWithUser: {
    array: [],
  },

  usersResponse: {
    type: Boolean,
  },

  comments: {
    array: [],
  },
});

const Objective = model("Objective", objectivesSchema);

module.exports = Objective;
