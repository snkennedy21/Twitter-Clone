import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  tagTypes: ["Tweet", "Comment", "User"],

  endpoints: (builder) => ({
    // *************** //
    // TWEET ENDPOINTS //
    // *************** //
    getAllTweets: builder.query({
      query: () => ({
        url: "/tweets",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tweets"],
    }),

    createTweet: builder.mutation({
      query: () => ({
        url: "/tweets",
        methods: "POST",
        body: "data",
        credentials: "include",
      }),
      invalidatesTags: ["Tweets"],
    }),

    likeTweet: builder.mutation({
      query: (data) => ({
        url: "/like",
        methods: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // ************************ //
    // AUTHENTICATION ENDPOINTS //
    // ************************ //
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
          // formData.append("username", info.email.value);
        }
        return {
          url: "/login",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
    }),

    checkIfEmailValid: builder.mutation({
      query: (email) => ({
        url: `/users/valid/email/${email}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    checkIfHandleValid: builder.mutation({
      query: (handle) => ({
        url: `/users/valid/handle/${handle}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllTweetsQuery,
  useCreateTweetMutation,
  useCreateAccountMutation,
  useLoginMutation,
  useCheckIfEmailValidMutation,
  useCheckIfHandleValidMutation,
} = mainApi;
