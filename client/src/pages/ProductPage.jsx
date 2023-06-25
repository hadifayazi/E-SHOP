const ProductPage = () => {
  return (
    <div>
      <div className="flex flex-1 mt-4 items-center gap-2 p-4">
        <div className="flex flex-col gap-2">
          <img
            src="https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
          />
        </div>
        <img
          className="object-cover h-full w-full "
          src="https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="watch"
        />
      </div>
      <div className="m-8 p-6 ">
        <h1 className="font-bold">Product Name</h1>
        <div>
          <span>Price: </span>
          <span className="font-bold">2000$</span>
        </div>
        <div>
          <span>Discription:</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            corrupti officiis nihil perferendis sed illo consectetur? Laudantium
            adipisci, debitis quis architecto quidem dicta provident dolor
            delectus quisquam! Ab, recusandae eligendi.
          </p>
        </div>

        <button
          type="submit"
          className="bg-custRed px-2 py-1 rounded-md shadow-sm mt-6"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
