import Product from "../model/productModel.js";

export const createProduct = async (req, res, next) => {
  const { title, img, desc, price, categories, size, color, inStock } =
    req.body;
  try {
    const product = await Product.create({
      title,
      img,
      desc,
      price,
      size,
      inStock,
      color,
      categories,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, img, desc, price, categories } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        img,
        desc,
        price,
        categories,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const getAllProducts = async (req, res, next) => {
  const latestQuery = req.query.latest;
  const categoryQuery = req.query?.category?.toLowerCase();
  console.log(categoryQuery);
  try {
    let products;

    if (latestQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (categoryQuery) {
      products = await Product.find({ categories: { $in: [categoryQuery] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
