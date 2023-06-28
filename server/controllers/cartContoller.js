import Cart from "../model/cartSchema.js";

export const createCart = async (req, res, next) => {
  const { userId, products } = req.body;
  try {
    const cart = await Cart.create({ userId, products });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ meesage: error.message });
  }
};

export const getCart = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ meesage: error.message });
  }
};

export const updateCart = async (req, res, next) => {
  const { id } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        products,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.deleteById(id);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Admin only
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
