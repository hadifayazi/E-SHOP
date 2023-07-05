import { useLocation } from "react-router-dom";
import { useGetProductQuery } from "../features/api/productApi";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/slices/cartSlice";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { data, isError, error, isSuccess } = useGetProductQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setProduct(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isError, error, isSuccess]);

  const handleClickQuantity = (type) => () => {
    if (type === "add") {
      quantity >= 1 && setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handlAddToCart = () => {
    const selectedProduct = {
      ...product,
      quantity,
      size,
      color,
    };

    dispatch(
      addProduct({
        product: selectedProduct,
        quantity,
      })
    );
  };

  return (
    <div className="">
      <div className="flex">
        {product && (
          <div>
            <div className="flex">
              <div className="flex flex-col gap-2 m-4">
                {product.img.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setImage(img)}
                    className="w-40"
                  />
                ))}
              </div>
              <div>
                <img
                  src={image || product.img[0]}
                  alt="product"
                  className="h-[95%] mb-4 w-full object-cover mt-4"
                />
              </div>
              <div className="ml-4 flex flex-col gap-6 mr-4 my-4 w-[70%]">
                <h1>
                  <span className="text-lg font-bold ">{product.title}</span>
                </h1>
                <h1>
                  <span>Price:</span>
                  <span className="text-lg font-bold ml-2">
                    {product.price}
                  </span>
                </h1>
                <div className="flex flex-row gap-2 ">
                  <span>Color:</span>
                  {product.color.map((c, index) => {
                    return (
                      <div
                        key={index}
                        className={`bg-${c}-500 h-5 w-5 border border-black rounded-full cursor-pointer`}
                        onClick={() => setColor(c)}
                      ></div>
                    );
                  })}
                </div>
                <div>
                  <span>Size:</span>
                  <select
                    className="w-10 border border-black ml-2"
                    onClick={(e) => setSize(e.target.value)}
                  >
                    <option disabled defaultValue></option>
                    {product.size.map((s, i) => {
                      return (
                        <option className="p-2" key={i}>
                          {s}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex gap-4 items-center mt-8 mb-4">
                  <BiMinus size={30} onClick={handleClickQuantity("minus")} />
                  <span className="border border-black px-3">{quantity}</span>
                  <BsPlus size={30} onClick={handleClickQuantity("add")} />
                </div>

                <button
                  className="bg-custRed px-3 py-1"
                  onClick={handlAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <div className=" flex flex-col gap-2 p-4">
                <span className="font-bold">Description: </span>
                <p className=""> {product.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
