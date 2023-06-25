import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiRamProfile } from "react-icons/gi";
import { useSignupUserMutation } from "../features/api/userApi";
import React from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [msg, setMsg] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [signupUser, { data, isSuccess, isError, error }] =
    useSignupUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setMsg(data.message);
      toast.success(msg);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setFile();
    }
    if (isError || error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, data, msg]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);

    signupUser(formData);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8  ">
      <h1 className="text-center text-2xl  font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col justify-center items-center m-2 w-full gap-2 ">
          <input
            className="border rounded-full border-teal-300 w-1/2 p-2  focus:outline-none  focus:border-red-950 "
            type="text"
            name="firstName"
            placeholder="Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="border rounded-full border-teal-300 w-1/2 p-2  focus:outline-none  focus:border-red-950 "
            type="text"
            name="lastName"
            placeholder="Your last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <div className="flex flex-col items-center sm:flex-row  gap-2">
            <span>
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="profile"
                  className=" h-10 w-10 rounded-full object-cover overflow-hidden"
                />
              ) : (
                <GiRamProfile fontSize={20} />
              )}
            </span>
            <input
              type="file"
              name={file}
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-xs w-60 text-custRed "
            />
          </div>
          <button
            type="submit"
            className="border rounded-full p-2  w-1/2 text-white bg-custRed  "
          >
            Sign up
          </button>

          <div className="text-gray-400 mt-2 flex flex-col  sm:flex-row gap-1">
            <p to="/forgoten-password" className="text-gray-500 text-sm ">
              Already have an account?
            </p>
            <Link to="/login" className="text-teal-500 text-sm ">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
