import Order from "../model/orderSchema.js";

export const createOrder = async (req, res, next) => {
  const { userId, products, amount, address, status } = req.body;
  try {
    const cart = await Order.create({
      userId,
      products,
      amount,
      address,
      status,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ meesage: error.message });
  }
};

//get user orders
export const getUserOrder = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ meesage: error.message });
  }
};

//Only Admin can updare an order
export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { userId, products, amount, address, status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        userId,
        products,
        amount,
        address,
        status,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Only Admin can updare an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.deleteById(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Admin only
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
