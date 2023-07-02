import { styled } from "styled-components";
import ProductItems from "./ProductItems";
import { mobile } from "../utils/responsive";
import { useGetAllProductsQuery } from "../features/api/productApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, isSuccess, isError, error } = useGetAllProductsQuery(category);

  useEffect(() => {
    if (isSuccess) {
      setFilteredProducts(
        data?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, data, isError, error, filters]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const renderedProductItems = filteredProducts?.map((product) => {
    return <ProductItems key={product._id} product={product} />;
  });

  return (
    <>
      <div className="flex justify-between mx-8 m-6 w-[95%] ">
        <div>
          <label>Filter by color:</label>
          <select
            name="color"
            className="border border-black rounded-lg ml-1"
            onChange={handleChange}
          >
            <option disabled></option>
            <option>white</option>
            <option>black</option>
            <option>blue</option>
            <option>yellow</option>
            <option>red</option>
            <option>other</option>
          </select>
        </div>
        <div>
          <label>Filter by Size:</label>
          <select
            name="size"
            className="border border-black rounded-lg ml-1"
            onChange={handleChange}
          >
            <option value="" disabled>
              -- Select --
            </option>
            <option>XS</option>
            <option>S</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>
      </div>

      <Container className="flex flex-wrap justify-between items-center py-8 bg-slate-200 ">
        {renderedProductItems}
      </Container>
    </>
  );
};

export default Products;
