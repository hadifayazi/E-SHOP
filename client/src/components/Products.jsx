import { styled } from "styled-components";
import ProductItems from "./ProductItems";
import { nanoid } from "nanoid";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  ${mobile({
    dipslay: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "10px",
  })}
`;

const Products = () => {
  const prodsucts = [
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/1186851/pexels-photo-1186851.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/691640/pexels-photo-691640.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/440320/pexels-photo-440320.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/109555/pexels-photo-109555.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/277429/pexels-photo-277429.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: nanoid(),
      title: "product name",
      price: 100,
      description: "Product desc",
      img: "https://images.pexels.com/photos/462394/pexels-photo-462394.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];
  const renderedProductItems = prodsucts.map((product) => {
    return <ProductItems key={product.id} product={product} />;
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
