import User from "../model/userModel.js";
import catchAsyncErr from "../utils/catchAsyncErr.js";
import AppErr from "../utils/AppErr.js";
import sendEmail from "../utils/email.js";
import jwt from "jsonwebtoken";
import sendToken from "../utils/sedJwtToken.js";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const activaitonToken = (email) => {
  return jwt.sign(email, process.env.JWT_ACTIVATION, {
    expiresIn: "10m",
  });
};

export const signupUser = async (req, res, next) => {
  let profilePicture = "";
  const deleteProfilePicture = (filename) => {
    if (filename) {
      const filePath = path.join("../public/assets", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting profile picture", err);
        }
      });
    }
  };
  try {
    const { firstName, lastName, email, password } = req.body;

    if (req.file) {
      profilePicture = req.file.filename;
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
    });

    const activate = activaitonToken({ email: user.email });
    const activationUrl = `${process.env.CLIENT_BASE_URL}/activation/${activate}`;
    const message = `Hi ${user.firstName},\nIn order to activate your account please click on the link below:\n${activationUrl}`;

    try {
      sendEmail({
        email: user.email,
        subject: "Account activation",
        message: message,
      });
      res.status(200).json({
        status: "success",
        message: `Activation link was successfully send via email, please check your email: ${user.email}`,
      });
    } catch (error) {
      deleteProfilePicture(profilePicture);
      next(
        new AppErr(
          "There was an error sending the activation email please try again later",
          500
        )
      );
    }
  } catch (err) {
    deleteProfilePicture(profilePicture);
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const key = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[key];
      res.status(401).json({ message: `The ${value} already exists!` });
    } else {
      res.status(401).json({ message: err.message });
    }
  }
};

export const verifyEmail = catchAsyncErr(async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_ACTIVATION);
    const email = decoded.email;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new AppErr("Please register your account", 404);
    }
    user.isVerified = true;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter your email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: `Incorrect email or password`,
      });
    }

    if (user.isVerified === false) {
      return res
        .status(401)
        .json({ message: `You must acctivate your account for ${user.email}` });
    }
    user.password = "";
    sendToken(user, 200, res);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Uncorrect email, please try again." });
    }

    //generating reset token
    const resetToken = user.createPasswordResetToken();
    user.save();

    //send the reset token to user.email
    const restUrl = `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;
    const message = `Forgot your password? click on the reset link:\n${restUrl}\nIf you didn't forgot your password please ignore this email.
    `;
    try {
      sendEmail({
        email: user.email,
        subject: "Rest password",
        message: message,
      });
      res.status(200).json({
        status: "success",
        message: `Rest token link was successfully send via email, please check your email: ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.passwordResetTokenExpiresAt = undefined;
      user.save();
      return res.status(500).json({
        message: "There was an error sending email, please try again.",
      });
    }
  } catch (error) {
    res.status(401).json({ message: error.message || error });
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      passwordResetTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid password token , or token is expired" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    res.status(401).json({ message: error.message || error });
  }
};

//update user profile
