import jwt from "jsonwebtoken";

const jwtToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = jwtToken({ id: user._id });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ token, user });
};
export default sendToken;
