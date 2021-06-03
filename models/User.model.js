const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },

    surname: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: String,

    profilePic: {
      type: String,
      default: `https://res.cloudinary.com/dczamxzfb/image/upload/v1619090125/ocra-app-project/l6x1mlwyqarpqxmqmhbl.jpg`,
    },

    shortBio: {
      type: String,
    },

    skills: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
