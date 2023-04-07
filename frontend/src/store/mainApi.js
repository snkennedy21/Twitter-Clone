import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  tagTypes: ["Tweet", "Tweets", "User", "UserTweets"],

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
      invalidatesTags: ["Tweets", "Tweet", "UserTweets"],
    }),

    increaseViewCount: builder.mutation({
      query: (data) => ({
        url: "/view",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tweets", "Tweet"],
    }),

    bookmarkTweet: builder.mutation({
      query: (data) => ({
        url: "/bookmark",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tweets", "Tweet"],
    }),

    // ************** //
    // USER ENDPOINTS //
    // ************** //
    getUserData: builder.query({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        const userId = JSON.parse(localStorage.getItem("currentUserId"));
        let formData = null;
        if (data instanceof HTMLElement) {
          formData = new FormData(data);
          console.log(data);
        }
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        return {
          url: `/users/${userId}`,
          method: "PUT",
          body: formData,
          credentials: "include",
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: ["UserTweets", "User", "Tweets"],
    }),

    getUserTweets: builder.query({
      query: (userId) => {
        return {
          url: `/users/${userId}/tweets`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["UserTweets"],
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
      invalidatesTags: ["Tweets", "Tweet"],
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
  useBookmarkTweetMutation,
  useIncreaseViewCountMutation,
  useGetUserDataQuery,
  useUpdateUserMutation,
  useGetUserTweetsQuery,
  useCreateAccountMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckIfEmailValidMutation,
  useCheckIfHandleValidMutation,
} = mainApi;
