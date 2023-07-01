import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);
export const payment = async (req, res) => {
  const { email, amount } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: email,
    });

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amount,
      currency: "EUR",
    });

    const invoice = await stripe.invoices.create({
      collection_method: "send_invoice",
      customer: invoiceItem.customer,
      due_date: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // Set due date to 7 days from now
    });

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: amount,
      currency: "EUR",
      payment_method_types: ["card"],
      description: "Payment for invoice " + invoice.id,
      metadata: { invoice_id: invoice.id },
    });
    console.log("INVOICE ITEM:", invoiceItem);
    console.log("****************************");
    console.log("Invoice:", invoice);
    console.log("****************************");
    console.log("paymentIntent:", paymentIntent);
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
