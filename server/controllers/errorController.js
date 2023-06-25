import AppErr from "../utils/AppErr.js";

// Wrong Mongo Id error
const handleDbCastError = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppErr(message, 400);
};

// Duplicate key error
const handleDbDuplicateNameError = (err) => {
  const message = `Duplicate field value ${err.keyValue.name}: Please use a different value`;
  return new AppErr(message, 400);
};

//jwt error
const handleJsonWebTokenError = () => new AppErr("Invalid token", 401);

export const handleTokenExpiredError = () =>
  new AppErr("Expired token please login again", 401);

export const globalErrHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (error.name === "Casterror") error = handleDbCastError(error);
  if (error.code === 11000) error = handleDbDuplicateNameError(error);
  if (error.name === "ValidationError") error = handlValidationErrorDB(error);
  if (error.name === "JsonWebTokenError")
    error = handleJsonWebTokenError(error);
  if (error.name === "TokenExpiredError")
    error = handleTokenExpiredError(error);

  res.status(error.statusCode).json(error.message);
};
