import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import multer from "multer";
import path from "path";
import { signupUser } from "./controllers/authController.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import productRouts from "./routes/productRoutes.js";
import { globalErrHandler } from "./controllers/errorController.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(helmet(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })));
app.use(mongoSanitize());
app.use("/assets", express.static(path.join(__dirname, "./public/assets")));

//file storage multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// app.all("*", (req, res, next) => {
//   console.log("req.body========", req.body);
//   console.log("req.params ======", req.params);
//   console.log(req.cookies);
//   next();
// });
const upload = multer({ storage: storage });

//Routes with file
app.post("/api/v1/users/signup", upload.single("image"), signupUser);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRouts);

// app.use(globalErrHandler);
