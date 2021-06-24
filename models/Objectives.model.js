const { Schema, model } = require("mongoose");

const objectivesSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Career", "Passion", "Relationship", "Financial", "Wellbeing"],
    // default: "Passion",
    required: true,
  },

  objectiveInput: {
    type: String,
    required: false,
  },

  objectiveEndDate: {
    type: Date,
    // required: true,
  },

  keyResult: {
    type: String,
    // required: true,
  },

  user: { type: Schema.Types.ObjectId, ref: "User" },

  buddy: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // required: true,
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

  // sharedWithUser: Array,

  usersResponse: {
    type: Boolean,
  },

  action: [{ type: Schema.Types.ObjectId, ref: "Action" }],

  // comments: Array,
});

const Objective = model("Objective", objectivesSchema);

module.exports = Objective;
