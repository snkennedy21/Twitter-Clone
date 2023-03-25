import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  tagTypes: ["Tweet", "Tweet", "Comment", "User"],

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

    getTweet: builder.query({
      query: (tweetID) => ({
        url: `/tweets/${tweetID}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tweet"],
    }),

    createTweet: builder.mutation({
      query: (tweetData) => ({
        url: "/tweets",
        method: "POST",
        body: tweetData,
        credentials: "include",
      }),
      invalidatesTags: ["Tweets", "Tweet"],
    }),

    likeTweet: builder.mutation({
      query: (data) => ({
        url: "/like",
        method: "POST",
        body: data,
        credentials: "include",
        contentType: "application/json",
      }),
      invalidatesTags: ["Tweets", "Tweet"],
    }),

    increaseViewCount: builder.mutation({
      query: (data) => ({
        url: "/view",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tweets"],
    }),

    // ************************ //
    // AUTHENTICATION ENDPOINTS //
    // ************************ //
    createAccount: builder.mutation({
      query: (likeData) => ({
        url: "/users",
        method: "POST",
        body: likeData,
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

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
        credentials: "include",
      }),
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
  useGetTweetQuery,
  useCreateTweetMutation,
  useLikeTweetMutation,
  useIncreaseViewCountMutation,
  useCreateAccountMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckIfEmailValidMutation,
  useCheckIfHandleValidMutation,
} = mainApi;
