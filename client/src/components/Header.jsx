import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { styled } from "styled-components";
import { mobile } from "../utils/responsive";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const Btn = styled.button`
  ${mobile({
    $mobile: `  display: "none",`,
  })}
`;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { quantity } = useSelector((state) => state.cart);

  return (
    <div className="bg-custRed h-16 w-full  flex justify-between p-4">
      <Link to="/" className="border rounded-fullp-1 px-2 text-sm sm:text-xl">
        <h1 className="text-white font-bold ">E-COM</h1>
      </Link>
      <div className="flex items-center bg-white border  rounded-full px-4">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className=" focus:outline-none sm:w-80"
        />
        <BsSearch />
      </div>
      <div className=" flex items-center gap-4  ">
        <Link to="/cart" className=" text-sm sm:text-2xl">
          <Badge badgeContent={quantity} color="primary">
            <GiShoppingCart style={{ color: "white" }} />
          </Badge>
        </Link>

        {user ? (
          <div className="text-white font bold border p-2 rounded-full">
            {user.firstName}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center rounded-full bg-white sm:pl-2 "
          >
            <Btn
              type="button"
              className="text-rose-700 text-sm sm:font-bold py-1"
            >
              Login
            </Btn>
            <span>
              <CgProfile style={{ color: "#EAB308", fontSize: "1.5rem" }} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
