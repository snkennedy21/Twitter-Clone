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
  }),
});

export const { useGetAllTweetsQuery, useCreateTweetMutation } = mainApi;
