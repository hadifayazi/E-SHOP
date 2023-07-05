import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const stripeApi = createApi({
  reducerPath: "api/stripe",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/stripe",
    headers: {
      Authorization:
        "Bearer pk_test_51NOEXjDiTHvFlkF0YySKaw4vVmk7WLTg0QGLiteA0mdCXc0WOyUY0WwbFLhbkRtfxYhKgNWELaJxXpunSLeshYUn004OsEY13Y",
    },
  }),
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query({ email, items }) {
        return {
          url: "/payment",
          method: "POST",
          credentials: "include",
          body: { email, items },
        };
      },
    }),
  }),
});

export const { useCheckoutMutation } = stripeApi;
export default stripeApi;
