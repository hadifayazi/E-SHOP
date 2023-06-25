import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../features/api/userApi";
import { toast } from "react-toastify";
import { setUser } from "../features/user/authSlice";
import { useDispatch } from "react-redux";

// hadifayazi4@gmail.com

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, isSuccess, isError, error }] = useLoginUserMutation(
    { email, password }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
      navigate("/");
    } else if (isError || error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, isError, error, data, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/326316/pexels-photo-326316.jpeg?auto=compress&cs=tinysrgb&w=600)`,
      }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 "
    >
      <h1 className="text-center text-2xl text-custRed font-bold"> Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center m-2 w-full gap-2 ">
          <input
            className="border rounded-full border-teal-300 w-1/2 p-2  focus:outline-none  focus:border-red-950 "
            type="email"
            name="email"
            placeholder="youremail@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-full  border-teal-300 w-1/2 p-2 focus:outline-none  focus:border-red-950 "
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border rounded-full p-2  w-1/2 text-white bg-custRed  "
          >
            Login
          </button>
          <div className="flex gap-2 ">
            <input type="checkbox" name="remember-me" className="w-4" />
            <span>Remember me</span>
          </div>
          <div className="text-gray-400 mt-2 flex flex-col gap-1">
            <Link to="/forgoten-password" className="text-teal-500 text-sm ">
              Forgot my password
            </Link>
            <p className="text-center text-sm">Or</p>
            <Link to="/signup" className="text-teal-500 text-sm ml-10">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
