import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <div className="bg-black/80 h-16 w-full flex justify-between p-4">
      <Link to="/" className="border rounded-full px-2">
        <h1 className="text-yellow-500 font-bold text-xl">E-COM</h1>
      </Link>
      <div className="flex items-center bg-white border  rounded-full px-4">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="focus:outline-none"
        />
        <BsSearch />
      </div>
      <div className=" flex items-center gap-4 ">
        <div>
          <GiShoppingCart style={{ color: "white", fontSize: "2rem" }} />
        </div>
        <div className="flex items-center rounded-full bg-white pl-2 ">
          <button type="button" className="text-rose-700 font-bold py-1">
            Login
          </button>
          <span>
            <CgProfile style={{ color: "#be123c", fontSize: "1.5rem" }} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
