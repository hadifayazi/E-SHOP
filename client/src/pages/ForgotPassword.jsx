import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../features/api/userApi";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [forgotPassword, { data, isError, error, isSuccess }] =
    useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (isError || error) {
      toast.error(error.data?.error);
    }
  }, [isSuccess, isError, error, data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1>Forgot your password? please enter your email!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="your@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none w-80 m-4 border rounded-full px-10 py-1"
        />
        <button
          type="submit"
          className="bg-custRed rounded-full px-4 py-1 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
