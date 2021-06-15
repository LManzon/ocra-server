const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const actionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },

  // user: { type: Schema.Types.ObjectId, ref: "User" },

  // objective: { type: Schema.Types.ObjectId, ref: "Objective" },

  status: {
    type: String,
    enum: ["Not Started", "In-Progress", "Completed"],
    default: "Not Started",
  },

  // actionDate: {
  //   type: Date,
  //   required: true,
  // },
});

const Action = model("Action", actionSchema);

module.exports = Action;
