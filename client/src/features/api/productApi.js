import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "api/product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/products",
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query(category = "") {
        return {
          url: category ? `/?category=${category}` : "/",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getProduct: builder.query({
      query(id) {
        return {
          url: `/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;
export default productApi;
