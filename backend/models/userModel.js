const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// function setImage(value) {
//   if (value) return value;
//   if (this.gender == "male") return "/images/demo/boy.jpg";
//   return "/images/demo/girl.jpg";
// }

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    gender: {
      type: String,
      //   required: true,
      enum: {
        values: ["male", "female"],
        message: "You must enter male or female!",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: (email) => {
        if (
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            email
          )
        )
          return email;
        throw new Error("Invalid email❌");
      },
    },
    img_path: {
      type: String,
      // maxLength: 364,
    },
    password: {
      type: String,
      required: true,
      match: /[0-9a-zA-Z]{4,16}/,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
