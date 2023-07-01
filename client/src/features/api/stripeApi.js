import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const stripeApi = createApi({
  reducerPath: "api/stripe",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/stripe",
    headers: {
      Autorization:
        "Bearer pk_test_51NOEXjDiTHvFlkF0YySKaw4vVmk7WLTg0QGLiteA0mdCXc0WOyUY0WwbFLhbkRtfxYhKgNWELaJxXpunSLeshYUn004OsEY13Y",
    },
  }),
  endpoints: (builder) => ({
    getPaymentIntent: builder.mutation({
      query({ email, amount }) {
        console.log(email, amount);
        return {
          url: "/payment",
          method: "POST",
          credentials: "include",
          body: { email, amount },
        };
      },
    }),
  }),
});

export const { useGetPaymentIntentMutation } = stripeApi;
export default stripeApi;
