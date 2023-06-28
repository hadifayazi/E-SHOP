import express from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCart,
} from "../controllers/cartContoller.js";

const router = express.Router();

router.route("/").post(createCart).get(getAllCarts);
router.get("/userId", getCart);
router.route("/:id").patch(updateCart).delete(deleteCart);

export default router;
