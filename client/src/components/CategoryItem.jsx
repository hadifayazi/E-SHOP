const CategoryItem = ({ category }) => {
  return (
    <div className="relative w-full ">
      <div className="absolute p-2 ">
        <img src={category.img} alt="productImage" className="cover" />
      </div>
      <div className="flex justify-center ">
        <h1 className="absolute text-white font-bold m-4">{category.title}</h1>
        <button className="absolute text-white  bg-black/40 hover:bg-custRed my-[50%] px-2 py-1 rounded-xl ">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
