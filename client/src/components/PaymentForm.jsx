import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useGetPaymentIntentMutation } from "../features/api/stripeApi";

const email = "hello@stripe.com";
const amount = 40000;
const PaymentForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [getPaymentIntent, { isLoading }] = useGetPaymentIntentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    try {
      const result = await getPaymentIntent({ email, amount });
      const clientSecret = result.data.clientSecret;

      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (paymentMethod.error) {
        setErrorMsg(paymentMethod.error.message);
      } else {
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.paymentMethod.id,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          // Payment successful
          console.log("Payment successful!");
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setErrorMsg("Payment failed. Please try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Card Details:</h3>
          <CardElement />
        </div>
        <button type="submit" disabled={!stripe || isLoading}>
          Pay
        </button>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
    </>
  );
};

export default PaymentForm;
