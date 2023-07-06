import { useSelector } from "react-redux";
import { GoTrash } from "react-icons/go";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useCheckoutMutation } from "../features/api/stripeApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [checkout] = useCheckoutMutation();
  const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

  const handlecheckout = async () => {
    if (!user) {
      navigate("/login");
    } else {
      const email = user.email;
      const items = cart.products?.map((product) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        };
      });

      const response = await checkout({ items, email });
      if (response.data) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: response.data.id });
      }
    }
  };

  const renderedProducts = cart.products?.map((product) => {
    return (
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-8 w-full h-full">
          <img
            src={product.img[0]}
            alt=""
            className="object-fill border-2 m-4 w-40 h-40"
          />

          <div className="flex flex-col gap-3">
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Size: {product.size}</p>
            <div className="flex gap-4 items-center">
              <span>Color: </span>
              <div
                className={`bordeer rounded-full h-6 w-6 bg-${product.color}-500`}
              ></div>
            </div>
          </div>
          <div>
            <button className="ml-6">
              <GoTrash size={20} color="red" />
            </button>
            <div className="flex gap-4 items-center mt-8 mb-4">
              <BiMinus size={30} />
              <span className="border border-black px-3">
                {product.quantity}
              </span>
              <BsPlus size={30} />
            </div>
          </div>
        </div>
        <hr className=" w-full  ml-4 mT-4" />
      </div>
    );
  });

  const chekcoutSection = cart.products?.map((product) => {
    return (
      <div className="w-full" key={product._id}>
        <div className="flex justify-between gap-10 m-6">
          <span>
            {product.title}
            <span> X {product.quantity}</span>
          </span>
          <span>{product.price * product.quantity}</span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1 className="text-center mt-6">Your cart items:</h1>
      <div className="flex justify-between items-center mt-16">
        <button
          type="submit"
          className="bg-white px-2 py-1 border-black border-4 ml-4"
        >
          Continue Shopping
        </button>
        <h2>Shopping Items</h2>
        <h2>Wish List</h2>
        <button
          onClick={handlecheckout}
          type="submit"
          className="bg-black px-2 py-1 border text-white mr-4"
        >
          Checkout Now
        </button>
      </div>
      <div className="flex justify-between ">
        <div className=" w-[70%]">{renderedProducts}</div>
        <div className="border-2  w-[30%]  h-full m-4 ">
          <div className="  p-4">{chekcoutSection}</div>
          <hr />
          <div className="flex justify-between m-10">
            <p>Total : </p>
            <span>{cart.totalPrice}</span>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handlecheckout}
              type="submit"
              className="bg-black px-2 py-1 border text-white w-[70%] mb-8"
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
