import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import { app } from "./app.js";

const port = process.env.PORT;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection was established"));

const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});

// Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name + ": " + err.message, err.stack);
  server.close(() => process.exit(1));
});

//Unhandeled rejection
process.on("unhandledRejection", (err) => {
  console.log("rejection: " + err.message, err.stack);
  server.close(() => process.exit(1));
});
