import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col gap-8 items-center text-center  w-full h-[100vh] bg-slate-400">
      <h1 className="text-white font-bold my-8 ">Cancel!</h1>
      <Link to="/cart" className="bg-custRed text-white px-2 py-1 ">
        Go to cart
      </Link>
    </div>
  );
};

export default Cancel;
