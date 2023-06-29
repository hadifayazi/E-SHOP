import Stripe from "stripe";

const stripe = new Stripe(process.env.Stripe_KEY);

export const payment = async (req, res) => {
  const { email, amount } = req.body;
  await stripe.customers
    .create({
      email: email,
    })
    .then(async (customer) => {
      // have access to the customer object
      return stripe.invoiceItems
        .create({
          customer: customer.id, // set the customer id
          amount: amount, // 25
          currency: "euro", // set the currency
        })
        .then((invoiceItem) => {
          return stripe.invoices.create({
            collection_method: "send_invoice",
            customer: invoiceItem.customer,
          });
        })
        .then((invoice) => {
          res.status(200).json(invoice);
          // New invoice created on a new customer
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
          // Deal with an error
        });
    });
};
