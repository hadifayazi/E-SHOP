const restricteRoute = (role) => (req, res, next) => {
  if (role !== "admin" || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not allowed to access this route" });
  }
  next();
};

export default restricteRoute;
