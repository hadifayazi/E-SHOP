import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name!"],
    minlength: 2,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name!"],
    minlength: 2,
  },
  email: {
    type: String,
    reqired: [true, "Please enter your email address"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    reqired: [true, "Please enter your password!"],
    minlength: 6,
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  adresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      adressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  profilePicture: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  passwordTokenUpdatedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
