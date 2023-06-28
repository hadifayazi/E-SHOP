import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);
router.get("/:userId", getUserOrder);
router.route("/:id").patch(updateOrder).delete(deleteOrder);

export default router;
