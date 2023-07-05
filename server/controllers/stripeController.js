import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);
export const payment = async (req, res) => {
  const { items, email } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: email,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      currency: "eur",
      mode: "payment",
      payment_method_types: ["card"],
      customer: customer.id,
      success_url: process.env.CLIENT_SUCCESS_URL,
      cancel_url: process.env.CLIENT_CANCEL_URL,
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
