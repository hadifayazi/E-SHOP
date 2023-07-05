import { styled } from "styled-components";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";

const ProductContainer = styled.div`
  ${mobile({
    $mobile: `
    width: "100%",`,
  })}
`;

const ProductItems = ({ product }) => {
  return (
    <ProductContainer className="flex flex-col w-[280px] h-80 p-1 ml-8">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.img[0]}
          alt={product.title}
          className="object-cover h-full w-[60%]"
        />
      </Link>
      <div className="">
        <h2 className="ml-2">{product.title}</h2>
        <h3 className="ml-2">Price: {product.price}</h3>
      </div>
    </ProductContainer>
  );
};

export default ProductItems;
