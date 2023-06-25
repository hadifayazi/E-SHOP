import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { styled } from "styled-components";
import { mobile } from "../utils/responsive";

const Btn = styled.button`
  ${mobile({
    display: "none",
  })}
`;

const Header = () => {
  return (
    <div className="bg-black h-16 w-full  flex justify-between p-4">
      <Link to="/" className="border rounded-fullp-1 px-2 text-sm sm:text-xl">
        <h1 className="text-yellow-500 font-bold ">E-COM</h1>
      </Link>
      <div className="flex items-center bg-white border  rounded-full px-4">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className=" focus:outline-none sm:w-16"
        />
        <BsSearch />
      </div>
      <div className=" flex items-center gap-4  ">
        <Link to="/cart" className=" text-sm sm:text-2xl">
          <GiShoppingCart style={{ color: "white" }} />
        </Link>
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
      </div>
    </div>
  );
};

export default Header;
