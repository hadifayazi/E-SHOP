import { Link, useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../features/api/userApi";
import { useEffect } from "react";

const ActivateAccount = () => {
  const { token } = useParams();
  const [verifyUser, { data }] = useVerifyUserMutation();

  useEffect(() => {
    if (token) {
      verifyUser(token);
    }
  }, [token, verifyUser]);

  const handleResendToken = () => {};
  return (
    <div className="w-full  h-full flex justify-center items-center border-ra">
      <div className="mt-10 border rounded-tl-3xl rounded-br-3xl bg-teal-400 w-80 h-40 text-center p-5">
        {data ? (
          <div className="flex justify-between mt-4">
            <div className="w-20 h-20 border border-transparent rounded-full bg-custRed shadow-lg">
              <div className=" text-white text-center font-bold pt-6">
                Verified
              </div>
            </div>
            <Link
              to="/login"
              className="w-40 h-10 hover:bg-blue-500 bg-sky-700 px-4 py-2 border rounded-full border-transparent shadow-lg text-white m-auto border-#FF5F9E  "
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-between  mt-4 ">
            <div className="w-20 h-20 border border-transparent rounded-full text-center p-3  bg-custRed  text-white shadow-lg">
              Token expired
            </div>
            <button
              className="w-40 h-10 hover:bg-blue-500 bg-sky-700 px-4 py-2 border rounded-full border-transparent shadow-lg text-white m-auto border-#FF5F9E  "
              onClick={handleResendToken}
            >
              Resend token
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
