import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const StripeContainer = () => {
  const stripePromise = loadStripe(
    "pk_test_51NOEXjDiTHvFlkF0YySKaw4vVmk7WLTg0QGLiteA0mdCXc0WOyUY0WwbFLhbkRtfxYhKgNWELaJxXpunSLeshYUn004OsEY13Y"
  );
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
