import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: "Please login to access!" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const currentUser = await User.findById(decoded.id);
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "please login to access!" });
  }
};

export default isAuthenticated;
