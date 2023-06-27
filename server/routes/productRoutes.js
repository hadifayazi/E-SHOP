import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// router.get("/", getProducts);
router.post("/", createProduct);
router.get("/", getAllProducts);
router.route("/:id").patch(updateProduct).delete(deleteProduct).get(getProduct);

export default router;
