import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
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
    passwordUpdatedAt: Date,
    resetPasswordToken: String,
    passwordResetTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordUpdatedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);
export default User;
