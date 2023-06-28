import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "api/product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/products",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query() {
        return {
          url: "/",
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
export default productApi;
