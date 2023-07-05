import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col gap-8 items-center text-center  w-full h-[100vh] bg-green-400 ">
      <h1 className="text-white font-bold my-8 ">Payment was successful!</h1>
      <Link to="/" className="bg-custRed text-white px-2 py-1 ">
        Go to home page
      </Link>
    </div>
  );
};

export default Success;
