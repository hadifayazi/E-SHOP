import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../features/api/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [resetPassword, { data, isSuccess, isError, error }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your password was updated");
      navigate("/");
    }
    if (isError || error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, isError, error, data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ token, password });
    console.log(password, "token" + token);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1>Please enter your new password.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="outline-none w-50 m-4 border rounded-full px-10 py-1"
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

export default ResetPassword;
