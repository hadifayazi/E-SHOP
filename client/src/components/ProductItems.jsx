import { styled } from "styled-components";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  ${mobile({
    width: "100%",
  })}
`;

const ProductItems = ({ product }) => {
  return (
    <Container className="flex flex-col w-[280px] h-80 p-1 ">
      <img
        src={product.img}
        alt={product.title}
        className="object-cover h-full"
      />
      <div className="">
        <h2 className="ml-2">{product.title}</h2>
        <h3 className="ml-3">Price: {product.price}</h3>
      </div>
    </Container>
  );
};

export default ProductItems;
