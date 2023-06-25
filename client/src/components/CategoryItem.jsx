import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="flax-1 w-full m-1 h-5/6 relative">
      <img src={category.img} alt="productImage" className="object-cover " />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col ">
        <h1 className="text-white font-bold">{category.title}</h1>
        <Link
          to={`/category/${category.title}`}
          type="button"
          className="bg-black/40 text-white px-2 py-1 rounded-md mt-4 hover:bg-pink-700"
        >
          See products
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
