import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/navigation/SideBar";
import Feed from "./pages/Feed";
import Modal from "./components/modal/Modal";
import SignupBar from "./components/authentication/SignupBar";
import CurrentTweet from "./pages/tweet/CurrentTweet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { invalidateToken, validateToken } from "./store/tokenSlice";
import { useDispatch } from "react-redux";
import React from "react";
import BottomBar from "./components/navigation/BottomBar";
import ProfilePage from "./pages/profile/ProfilePage";
import BookmarkedTweets from "./pages/bookmarks/BookmarkedTweets";

function App() {
  const token = useSelector((state) => state.token).token;
  const dispatch = useDispatch();

  useEffect(() => {
    const authorizationCookie = document.cookie;
    console.log("auth cookie: ", authorizationCookie);
    if (authorizationCookie === "session=true") {
      console.log("HERE I AM NOW");
      dispatch(validateToken());
    } else {
      console.log("POTATO");
      dispatch(invalidateToken());
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("currentUser");
    }
  });

  return (
    <React.Fragment>
      <BrowserRouter>
        <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
          <SideBar />
          <Feed>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tweets/:tweetId" element={<CurrentTweet />} />
              <Route path="/bookmarks" element={<BookmarkedTweets />} />
            </Routes>
          </Feed>

          <Modal>{/* <Login /> */}</Modal>
        </main>
        {token ? <BottomBar /> : <SignupBar />}
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
