import { styled } from "styled-components";
import ProductItems from "./ProductItems";
import { mobile } from "../utils/responsive";
import { useGetAllProductsQuery } from "../features/api/productApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Container = styled.div`
  ${mobile({
    $mobile: `
    dipslay: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "10px",`,
  })}
`;

const Products = () => {
  const { data, isSuccess, isError, error } = useGetAllProductsQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, data, isError, error]);

  const renderedProductItems = data?.map((product) => {
    return <ProductItems key={product._id} product={product} />;
  });
  return (
    <>
      <h1 className="ml-2 sm:ml-[35%] mt-12 mb-5 text-lg  sm:text-3xl">
        Most popular products:
      </h1>
      <Container className="flex flex-wrap justify-between items-center py-8 bg-slate-200 ">
        {renderedProductItems}
      </Container>
    </>
  );
};

export default Products;
